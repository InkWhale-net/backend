import {global_event_vars} from "./global";
import {ApiPromise} from "@polkadot/api";
import crypto from "crypto";
import {CONFIG_TYPE_NAME} from "../utils/constant";
import {convertToUTCTime} from "../utils/Tools";
import {ScannedBlocksSchemaRepository} from "../repositories";
import * as mongoDB from "mongodb";
import {send_telegram_message} from "../utils/utils";
import {Abi, ContractPromise} from "@polkadot/api-contract";
import * as inw_token_calls from "../contracts/inw_token_calls";
import {inw_token} from "../contracts/inw_token";
import {compactAddLength, hexToU8a} from "@polkadot/util";
import {RedisCache} from "./ScanBlockCaching";

let inw_contract: ContractPromise;
export function setContract(c: ContractPromise) {
    inw_contract = c;
}

export async function scanEventBlocks(
    newCache: RedisCache,
    header: any,
    blockNumber: number,
    api: ApiPromise,
    scannedBlocksCollection: mongoDB.Collection,
    eventTransferCollection: mongoDB.Collection,
    abi_inw_token_contract: Abi,
    abi_token_generator_contract: Abi,
    inw_contract: ContractPromise
) {
    try {
        if (global_event_vars.isScanning) {
            const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
            const signedBlock = await api.rpc.chain.getBlock(blockHash);

            console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - Start processEventRecords at ${blockNumber} now: ${convertToUTCTime(new Date())}`);
            await processEventRecords(
                newCache,
                signedBlock,
                blockNumber,
                abi_inw_token_contract,
                abi_token_generator_contract,
                api,
                inw_contract,
                eventTransferCollection
            );
            console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - Stop processEventRecords at ${blockNumber} now: ${convertToUTCTime(new Date())}`);
            return;
        }
        global_event_vars.isScanning = true;
        const isDebug = false;
        if (!isDebug) {
            try {
                console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - Start processEventRecords history at ${blockNumber} now: ${convertToUTCTime(new Date())}`);
                let lastBlock_db = await scannedBlocksCollection.findOne({
                    lastScanned: true
                });
                let last_scanned_blocknumber = 0;
                if (lastBlock_db && lastBlock_db?.blockNumber) {
                    last_scanned_blocknumber = lastBlock_db.blockNumber;
                } else {
                    try {
                        await scannedBlocksCollection.insertOne({
                            lastScanned: true,
                            blockNumber: 1,
                            createdTime: new Date(),
                            updatedTime: new Date()
                        });
                    } catch (e) {
                        console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - ERROR: ${e.message}`);
                    }
                }
                console.log({last_scanned_blocknumber: last_scanned_blocknumber});
                if (last_scanned_blocknumber == 0) last_scanned_blocknumber = blockNumber;
                for (let to_scan = last_scanned_blocknumber; to_scan <= blockNumber; to_scan++) {
                    const blockHash = await api.rpc.chain.getBlockHash(to_scan);
                    const signedBlock = await api.rpc.chain.getBlock(blockHash);
                    console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - Start processEventRecords at ${to_scan} now: ${convertToUTCTime(new Date())}`);
                    await processEventRecords(
                        newCache,
                        signedBlock,
                        to_scan,
                        abi_inw_token_contract,
                        abi_token_generator_contract,
                        api,
                        inw_contract,
                        eventTransferCollection
                    );
                    console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - Stop processEventRecords at ${to_scan} now: ${convertToUTCTime(new Date())}`);
                    try {
                        await scannedBlocksCollection.updateOne({
                                lastScanned: true,
                        },{
                            "$set": {
                                lastScanned: true,
                                blockNumber: to_scan,
                                updatedTime: new Date()
                            }
                        },
                            { upsert: true });
                    } catch (e) {
                        console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - ERROR: ${e.message}`);
                    }
                }
            } catch (e) {
                send_telegram_message("scanBlocks - " + e.message);
            }
        }
        global_event_vars.isScanning = false;
    } catch (e) {
        console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - ERROR: ${e.message}`);
    }
}

export async function processEventRecords(
    newCache: RedisCache,
    signedBlock: any,
    toScan: number,
    abi_inw_token_contract: Abi,
    abi_token_generator_contract: Abi,
    api: ApiPromise,
    inw_contract: ContractPromise,
    eventTransferCollection: mongoDB.Collection,
) {
    try {
        /**
         * Send from:   5GW1hMMrRva2NQ5E2s54kzjeQtGZfMzhQrksUDd8UU3Va6Xh
         * Send to:     5E71DGyjRFWu5KgGVhArhQMyqn4FYseUZaXnz1BmvGpkR9Mz
         * Amount:      1440000000000000
         * Token:       5H4aCwLKUpVpct6XGJzDGPPXFockNKQU2JUVNgUw6BXEPzST
         * timestamp:   2023-06-27T06:50:58.421Z
         */
        let index=0;
        for (const ex of signedBlock.block.extrinsics) {
            index = index + 1;
            let newData:{
                ex?: any,
                tokenContract?: string,
                value?: string,
                gas_limit?: object,
                storage_deposit_limit?: any,
                data?: any,
                documentation?: any,
                signer?: string,
                signature?: string,
                nonce?: string,
                method?: string,
                section?: string,
                to?: any,
                amount?: any,
                args?: any,
                decoded?: any,
            } = {};
            newData.ex = ex.toHuman();
            const { isSigned, meta, method: { args, method, section } } = ex.toHuman();
            if (isSigned) {
                if (args) {
                    newData.tokenContract = args.dest.Id;
                    newData.value = args.value;
                    newData.gas_limit = args.gas_limit;
                    newData.storage_deposit_limit = args.storage_deposit_limit;
                    newData.data = args.data;
                }
                if (meta?.documentation) {
                    newData.documentation = meta.documentation;
                }
                newData.signer = ex.signer.toString();
                newData.signature = ex.signature.toString();
                newData.nonce = ex.nonce.toString();
                newData.method = method;
                newData.section = section;
                if (
                    method === `call`
                    && section === `contracts`
                    && args
                    && args?.data
                    || true
                ) {
                    let decodedMessage = inw_contract.abi.decodeMessage(compactAddLength(hexToU8a(args?.data)));
                    const {identifier, method, path} = decodedMessage.message;
                    if (!(identifier === 'PSP22::transfer' && method === 'psp22::transfer')) {
                        continue;
                    }
                    if (decodedMessage?.args) {
                        newData.to = decodedMessage.args[0].toHuman();
                        newData.amount = decodedMessage.args[1].toHuman();
                        newData.args = JSON.stringify(decodedMessage.args);
                        newData.decoded = decodedMessage;
                    }
                }

                // console.log(newData);
                const filter = {
                    blockNumber: toScan,
                    eventIndex: index,
                    fromAddress: newData.signer ? newData.signer.toString() : '',
                    toAddress: newData.to ? newData.to.toString() : '',
                    tokenAddress: newData.tokenContract ? newData.tokenContract.toString() : '',
                    amount: newData.amount ? parseFloat(newData.amount.replace(`,`,'')) : 0,
                };
                const eventData = await eventTransferCollection.findOne(filter);
                if (!eventData) {
                    await eventTransferCollection.insertOne({
                        ...filter,
                        data: newData,
                        createdTime: new Date(),
                        updatedTime: new Date(),
                    });
                } else {
                    await eventTransferCollection.updateMany(filter,{
                        "$set": {
                            ...filter,
                            data: newData,
                            createdTime: new Date(),
                            updatedTime: new Date(),
                        }
                    },
                        { upsert: true });
                }
            }

            // TODO: Process caching
            // const newKey = `${toScan}_${index}`;
            // const cacheResults = await newCache.get(newKey);
            // console.log(cacheResults);
            // if (cacheResults) {
            //     console.log(`${newKey} is cached.`);
            // } else {
            //     await newCache.set(newKey, JSON.stringify(newData), {
            //         EX: 180,
            //         NX: true,
            //     });
            // }
        }
        console.log(`====================================COMPLETED====================================================`);
    } catch (e) {
        console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - ERROR: ${e.message}`);
    }
}