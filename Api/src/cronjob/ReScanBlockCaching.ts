import {createClient, RedisClientType} from "redis";
import dotenv from "dotenv";
import * as mongoDB from "mongodb";
import {EventTransfer, ScannedBlocks} from "../models";
import {ApiPromise, WsProvider} from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import {global_event_vars, SOCKET_STATUS} from "./global";
import {reScanEventBlocks} from "./Action";
import {Abi, ContractPromise} from "@polkadot/api-contract";
import {inw_token} from "../contracts/inw_token";
import * as inw_token_calls from "../contracts/inw_token_calls";
import {token_generator_contract} from "../contracts/token_generator";
import {RedisCache} from "./ScanBlockCaching";
dotenv.config();

export const collections: {
    eventTransfer?: mongoDB.Collection,
    scannedBlocks?: mongoDB.Collection,
    reScannedBlocks?: mongoDB.Collection,
} = {}
export async function connectToDatabase () {
    dotenv.config();
    const dbUrl:string = process.env.DB_URL ? process.env.DB_URL : `127.0.0.1:27017`;
    const nodeBlockNumber = (process.env.NODE_BLOCK_NUMBER) ? process.env.NODE_BLOCK_NUMBER : `Default${Math.random()}`;
    const dbEventTransferCollection:string = `EventTransfer`;
    const dbScannedBlockCollection:string = `ScannedBlocks`;
    const dbReScannedBlockCollection:string = `ReScannedBlocks${nodeBlockNumber}`;
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbUrl);
    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_URL_NAME);
    const eventTransferCollection: mongoDB.Collection = db.collection(dbEventTransferCollection);
    collections.eventTransfer = eventTransferCollection;
    const scannedBlockCollection: mongoDB.Collection = db.collection(dbScannedBlockCollection);
    collections.scannedBlocks = scannedBlockCollection;
    const reScannedBlockCollection: mongoDB.Collection = db.collection(dbReScannedBlockCollection);
    collections.reScannedBlocks = reScannedBlockCollection;

    console.log(`Successfully connected to database: ${db.databaseName}`);
    console.log(`Successfully connected to collection: ${eventTransferCollection.collectionName}`);
    console.log(`Successfully connected to collection: ${scannedBlockCollection.collectionName}`);
    console.log(`Successfully connected to collection: ${reScannedBlockCollection.collectionName}`);
}

export async function mainReScanBlockCaching():Promise<void> {
    const redisCache = new RedisCache(5000);
    connectToDatabase().then(() => {
        const rpc = process.env.PROVIDER;
        const startBlockNumber:number = process.env.START_BLOCK_NUMBER ? parseInt(process.env.START_BLOCK_NUMBER) : 0;
        const endBlockNumber:number = process.env.END_BLOCK_NUMBER ? parseInt(process.env.END_BLOCK_NUMBER) : 0;
        if (!rpc) {
            console.log(`RPC not found! ${rpc}`);
            return;
        }
        if (!startBlockNumber || !endBlockNumber || startBlockNumber > endBlockNumber) {
            console.log(`BlockNumber not defined! startBlockNumber: ${startBlockNumber}, endBlockNumber: ${endBlockNumber}`);
            return;
        }
        const provider = new WsProvider(rpc);
        let eventApi = new ApiPromise({
            provider,
            rpc: jsonrpc,
            types: {
                ContractsPsp34Id: {
                    _enum: {
                        U8: "u8",
                        U16: "u16",
                        U32: "u32",
                        U64: "u64",
                        U128: "u128",
                        Bytes: "Vec<u8>",
                    },
                },
            },
        });
        eventApi.on("connected", () => {
            global_event_vars.socketStatus = SOCKET_STATUS.CONNECTED;
            eventApi.isReady.then(async (api: any) => {
                console.log(`Global RPC Ready. start processing now: ${rpc}`);

                // Config redis
                await redisCache.connect();
                const multi: any = await redisCache.multi();

                const inw_contract = new ContractPromise(
                    eventApi,
                    inw_token.CONTRACT_ABI,
                    inw_token.CONTRACT_ADDRESS
                );
                inw_token_calls.setContract(inw_contract);

                const abi_inw_token_contract = new Abi(inw_token.CONTRACT_ABI);
                const abi_token_generator_contract = new Abi(token_generator_contract.CONTRACT_ABI);

                await eventApi.rpc.chain.subscribeNewHeads((header: any) => {
                    try {
                        if (
                            collections.eventTransfer
                            && collections.scannedBlocks
                            && collections.reScannedBlocks
                        ) {
                            console.log(`reScanEventBlocks`);
                            reScanEventBlocks(
                                redisCache,
                                multi,
                                header,
                                startBlockNumber,
                                endBlockNumber,
                                eventApi,
                                collections.reScannedBlocks,
                                collections.eventTransfer,
                                abi_inw_token_contract,
                                abi_token_generator_contract,
                                inw_contract
                            );
                        }
                    } catch (e) {
                        console.log(`mainReScanBlockCaching - ERROR: ${e.message}`);
                    }

                });
            });
        });

        eventApi.on("ready", () => {
            console.log("Global RPC Ready");
            global_event_vars.socketStatus = SOCKET_STATUS.READY;
        });

        eventApi.on("error", (err) => {
            global_event_vars.socketStatus = SOCKET_STATUS.ERROR;
            console.log('error', err);
        });
    });
}

mainReScanBlockCaching().then();