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

let inw_contract: ContractPromise;
export function setContract(c: ContractPromise) {
    inw_contract = c;
}

export async function scanEventBlocks(
    header: any,
    blockNumber: number,
    api: ApiPromise,
    scannedBlocksCollection: mongoDB.Collection,
    eventTransferCollection: mongoDB.Collection,
    abi_inw_token_contract: Abi,
    abi_psp22_contract: Abi,
    abi_token_generator_contract: Abi,
) {
    try {

        const contract = new ContractPromise(
            api,
            inw_token.CONTRACT_ABI,
            inw_token.CONTRACT_ADDRESS
        );

        if (!global_event_vars.isScanning) {
            const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
            // @ts-ignore
            const eventRecords = await api.query.system.events.at(blockHash);


            console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - Start processEventRecords at ${blockNumber} now: ${convertToUTCTime(new Date())}`);
            // console.log({eventRecords: eventRecords});
            await processEventRecords(
                eventRecords,
                blockNumber,
                abi_inw_token_contract,
                abi_psp22_contract,
                abi_token_generator_contract,
                api
            );
            console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - Stop processEventRecords at ${blockNumber} now: ${convertToUTCTime(new Date())}`);
            return;
        }
        global_event_vars.isScanning = true;
        // const isDebug = true;
        // if (!isDebug) {
        //     try {
        //         console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - Start processEventRecords history at ${blockNumber} now: ${convertToUTCTime(new Date())}`);
        //         //Check database to see the last checked blockNumber
        //         let lastBlock_db = await scannedBlocksCollection.findOne({
        //             where: {
        //                 lastScanned: true
        //             }
        //         });
        //         let last_scanned_blocknumber = 0;
        //         if (lastBlock_db && lastBlock_db?.blockNumber) {
        //             last_scanned_blocknumber = lastBlock_db.blockNumber;
        //         } else {
        //             try {
        //                 await scannedBlocksCollection.insertOne({
        //                     lastScanned: true,
        //                     blockNumber: 0,
        //                     createdTime: new Date(),
        //                     updatedTime: new Date()
        //                 });
        //             } catch (e) {
        //                 console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - ERROR: ${e.message}`);
        //             }
        //         }
        //         if (last_scanned_blocknumber == 0) last_scanned_blocknumber = blockNumber;
        //         for (let to_scan = last_scanned_blocknumber; to_scan <= blockNumber; to_scan++) {
        //             const blockHash = await api.rpc.chain.getBlockHash(to_scan);
        //             // @ts-ignore
        //             const eventRecords = await api.query.system.events.at(blockHash);
        //             console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - Start processEventRecords at ${to_scan} now: ${convertToUTCTime(new Date())}`);
        //             await processEventRecords(
        //                 eventRecords,
        //                 to_scan,
        //                 abi_inw_token_contract,
        //                 abi_psp22_contract,
        //                 api,
        //             );
        //             console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - Stop processEventRecords at ${to_scan} now: ${convertToUTCTime(new Date())}`);
        //             try {
        //                 await scannedBlocksCollection.findOneAndUpdate({
        //                     lastScanned: true,
        //                 },{
        //                     lastScanned: true,
        //                     blockNumber: to_scan,
        //                     updatedTime: new Date()
        //                 });
        //             } catch (e) {
        //                 console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - ERROR: ${e.message}`);
        //             }
        //         }
        //     } catch (e) {
        //         send_telegram_message("scanBlocks - " + e.message);
        //     }
        // }
        // global_event_vars.isScanning = false;
    } catch (e) {
        console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - ERROR: ${e.message}`);
    }
}

export async function processEventRecords(
    eventRecords: any,
    toScan: number,
    abi_inw_token_contract: Abi,
    abi_psp22_contract: Abi,
    abi_token_generator_contract: Abi,
    api: ApiPromise,
) {
    try {
        /**
         * Send from:   5GW1hMMrRva2NQ5E2s54kzjeQtGZfMzhQrksUDd8UU3Va6Xh
         * Send to:     5E71DGyjRFWu5KgGVhArhQMyqn4FYseUZaXnz1BmvGpkR9Mz
         * Amount:      1440000000000000
         * Token:       5H4aCwLKUpVpct6XGJzDGPPXFockNKQU2JUVNgUw6BXEPzST
         * timestamp:   2023-06-27T06:50:58.421Z
         */

        // const data = `db20f9f55a396180c457425324b7b5f7281378942a89c58d2676940b1e8423458f5f171100007a20ac1d0500000000000000000000`;
        // const decodedEvent = abi_inw_token_contract.decodeEvent(Buffer.from(data, 'utf8'));
        // console.log(decodedEvent);


        for (const record of eventRecords) {
            const {phase, event: {data, method, section, index}, topics} = record;
            console.log({
                phase: phase.toString(),
                data: data.toString(),
                method: method.toString(),
                section: section.toString(),
                index: index.toString(),
                topics: topics.toString(),
            });

            // const { event, phase, topics } = record;
            // const types = event.typeDef;
            // // console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
            // // console.log(`\t\t${event.meta.documentation.toString()}`);
            //
            // console.log(`============================================================================================`);
            // console.log(types);
            // console.log({
            //     phase: phase.toString(),
            //     data: event.data.toString(),
            //     method: event.method.toString(),
            //     section: event.section.toString(),
            //     index: event.index.toString(),
            //     topics: topics.toString(),
            // });
            // event.data.forEach((data:any, index:any) => {
            //     console.log(`\t${types[index].type}: ${data.toString()}`);
            // });


            // if (section == "contracts" && method == "Called") {
            //     console.log(record);
            //     const eventData = record.event.data;
            //     const decodedEvent = abi_token_generator_contract.decodeEvent(record.topics[0].slice(0, 2));
            //     console.log(decodedEvent);
            //
            //     // const [accId, tokenId] = data.map((data: any, _: any) => data).slice(0, 2);
            //     // // const [topic0, topic1] = topics.map((topics: any, _: any) => topics.slice(0, 2));
            //     //
            //     // const topic0 = topics[0];
            //     // const topic1 = topics[1];
            //     //
            //     // // const address = data[0].toString();
            //     // // const bytes = data[1].toString();
            //     // console.log({accId: accId.toString()});
            //     // console.log({tokenId: tokenId.toString()});
            //     // console.log({topic0: topic0});
            //     // console.log({topic1: topic1.toString()});
            //     //
            //     // const decodedEvent = abi_psp22_contract.decodeEvent(topic0);
            //     // console.log(decodedEvent);
            //
            //     console.log({
            //         caller: data.caller.toString(),
            //         contract: data.contract.toString(),
            //     });
            // }
        }
        console.log(`====================================COMPLETED====================================================`);
    } catch (e) {
        console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - ERROR: ${e.message}`);
    }
}