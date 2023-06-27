import {createClient, RedisClientType} from "redis";
import dotenv from "dotenv";
import * as mongoDB from "mongodb";
import {EventTransfer, ScannedBlocks} from "../models";
import {randomAsNumber} from "@polkadot/util-crypto";
import {ApiPromise, WsProvider} from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import {global_event_vars, SOCKET_STATUS} from "./global";
import {scanEventBlocks} from "./Action";
import {Abi, ContractPromise} from "@polkadot/api-contract";
import {inw_token} from "../contracts/inw_token";
import * as inw_token_calls from "../contracts/inw_token_calls";
import {psp22_contract} from "../contracts/psp22_contract";
dotenv.config();

export const collections: {
    eventTransfer?: mongoDB.Collection,
    scannedBlocks?: mongoDB.Collection,
    reScannedBlocks?: mongoDB.Collection,
} = {}
export async function connectToDatabase () {
    dotenv.config();
    const dbUrl:string = process.env.DB_URL ? process.env.DB_URL : `127.0.0.1:27017`;
    const dbEventTransferCollection:string = `EventTransfer`;
    const dbScannedBlockCollection:string = `ScannedBlocks`;
    const dbReScannedBlockCollection:string = `ReScannedBlocks`;
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

export class RedisCache {
    private readonly cache: RedisClientType;
    private ttl: number; // Time to Live

    constructor(ttl: number) {
        this.ttl = ttl;
        this.cache = createClient({
            url: process.env.REDIS_URL
        });
        this.cache.on("error", (error: any) => {
            console.error(`Redis Client Error: ${error}`);
        });
        this.cache.on("connect", () => {
            console.log(`Redis connection established`);
        });
    }

    async test() {
        await this.cache.connect();

        // TODO: Add events Data into cache
        for(let blockNumber = 0; blockNumber < 100; blockNumber++) {
            const eventData = {
                data: `blockNumberData_${blockNumber}`,
                createdTime: new Date().getTime(),
                updatedTime: new Date().getTime(),
            };
            await this.cache.set(`blockNumber_${blockNumber}`, JSON.stringify(eventData));

            if (collections?.eventTransfer) {
                const eventDataObject = await collections.eventTransfer.findOne({
                    blockNumber: blockNumber
                });
                if (eventDataObject) {
                    console.log({eventData: eventDataObject});
                } else {
                    await collections.eventTransfer.insertOne({
                        blockNumber: randomAsNumber(),
                        data: {
                            ...eventData,
                            name: `test`,
                            value: `test_${new Date().getTime()}`,
                        },
                        createdTime: new Date(),
                        updatedTime: new Date(),
                    });
                }
            }
        }

        let value = await this.cache.get(`blockNumber_${12}`);
        console.log({value: value});



        await this.cache.flushDb();

        value = await this.cache.get(`blockNumber_${17}`);
        console.log({value: value});

        await this.cache.disconnect();
    }
}

export async function mainScanBlockCaching():Promise<void> {
    connectToDatabase().then(() => {
        const rpc = process.env.PROVIDER_MAINNET;
        if (!rpc) {
            console.log(`RPC not found! ${rpc}`);
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

                // Redis loading
                // const newCache = new RedisCache(5000);
                // newCache.test().then();

                const inw_contract = new ContractPromise(
                    eventApi,
                    inw_token.CONTRACT_ABI,
                    inw_token.CONTRACT_ADDRESS
                );
                inw_token_calls.setContract(inw_contract);

                const abi_inw_token_contract = new Abi(inw_token.CONTRACT_ABI);
                const abi_psp22_contract = new Abi(psp22_contract.CONTRACT_ABI);

                await eventApi.rpc.chain.subscribeNewHeads((header: any) => {
                    try {
                        if (
                            collections.eventTransfer
                            && collections.scannedBlocks
                            && collections.reScannedBlocks
                        ) {
                            console.log(`scanEventBlocks`);
                            scanEventBlocks(
                                // parseInt(header.number.toString()),
                                51194491,
                                eventApi,
                                collections.scannedBlocks,
                                collections.eventTransfer,
                                abi_inw_token_contract,
                                abi_psp22_contract
                            );
                        }
                    } catch (e) {
                        console.log(`mainScanBlockCaching - ERROR: ${e.message}`);
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

mainScanBlockCaching().then();