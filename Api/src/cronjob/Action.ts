import {global_event_vars} from "./global";
import {ApiPromise} from "@polkadot/api";
import {CONFIG_TYPE_NAME} from "../utils/constant";
import {convertToUTCTime} from "../utils/Tools";
import * as mongoDB from "mongodb";
import {convertNumberWithoutCommas, formatNumDynDecimal, getAllFloorPriceArtZero, getAzeroPrice, resolveDomain, send_telegram_message} from "../utils/utils";
import {Abi, ContractPromise} from "@polkadot/api-contract";
import {compactAddLength, hexToU8a} from "@polkadot/util";
import {RedisCache} from "./ScanBlockCaching";
import {inw_token} from "../contracts/inw_token";
import {pool_contract} from "../contracts/pool";
import {nft_pool_contract} from "../contracts/nft_pool";
import {EventPool} from "../models";
import {pool_generator_contract} from "../contracts/pool_generator";
import {nft_pool_generator_contract} from "../contracts/nft_pool_generator";
import { LpPoolsSchemaRepository, NftPoolsSchemaRepository, PoolsSchemaRepository, StatsSchemaRepository } from "../repositories";
import prices from '../utils/prices.json'
import { lp_pool_generator_contract } from "../contracts/lp_pool_generator";
import { lp_pool_contract } from "../contracts/lp_pool";
import axios from "axios";

let inw_contract: ContractPromise;
export function setContract(c: ContractPromise) {
    inw_contract = c;
}

export async function scanEventBlocks(
    newCache: RedisCache | undefined,
    multi: any,
    header: any,
    blockNumber: number,
    api: ApiPromise,
    scannedBlocksCollection: mongoDB.Collection,
    eventTransferCollection: mongoDB.Collection,
    eventPoolCollection: mongoDB.Collection,
    poolsCollection: mongoDB.Collection,
    nftPoolsCollection: mongoDB.Collection,
    lpPoolCollection: mongoDB.Collection,
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
                multi,
                signedBlock,
                blockNumber,
                false,
                abi_inw_token_contract,
                abi_token_generator_contract,
                api,
                inw_contract,
                eventTransferCollection,
                eventPoolCollection,
                poolsCollection,
                nftPoolsCollection,
                lpPoolCollection
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
                        multi,
                        signedBlock,
                        to_scan,
                        true,
                        abi_inw_token_contract,
                        abi_token_generator_contract,
                        api,
                        inw_contract,
                        eventTransferCollection,
                        eventPoolCollection,
                        poolsCollection,
                        nftPoolsCollection,
                        lpPoolCollection
                    );
                    console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - Stop processEventRecords at ${to_scan} now: ${convertToUTCTime(new Date())}`);
                    try {
                      await scannedBlocksCollection.updateOne(
                        {
                          lastScanned: true,
                        },
                        {
                          $set: {
                            lastScanned: true,
                            blockNumber: to_scan,
                            updatedTime: new Date(),
                          },
                        },
                        {upsert: true},
                      );
                    } catch (e) {
                      console.log(
                        `${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - ERROR: ${e.message}`,
                      );
                    }
                }
            } catch (e) {
                // send_telegram_message("scanBlocks - " + e.message);
            }
        }
        global_event_vars.isScanning = false;
    } catch (e) {
        console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - ERROR: ${e.message}`);
    }
}

export async function reScanEventBlocks(
    newCache: RedisCache | undefined,
    multi: any,
    header: any,
    startBlockNumber: number,
    endBlockNumber: number,
    api: ApiPromise,
    reScannedBlocksCollection: mongoDB.Collection,
    eventTransferCollection: mongoDB.Collection,
    eventPoolCollection: mongoDB.Collection,
    poolsCollection: mongoDB.Collection,
    nftPoolsCollection: mongoDB.Collection,
    lpPoolCollection: mongoDB.Collection,
    abi_inw_token_contract: Abi,
    abi_token_generator_contract: Abi,
    inw_contract: ContractPromise
) {
    try {
        const isDebug = false;
        if (!isDebug && !global_event_vars.isReScanning) {
            try {
                global_event_vars.isReScanning = true;
                for (let to_scan = startBlockNumber; to_scan <= endBlockNumber; to_scan++) {
                    const blockHash = await api.rpc.chain.getBlockHash(to_scan);
                    const signedBlock = await api.rpc.chain.getBlock(blockHash);
                    console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_RE_SCANNED} - Start reScanEventBlocks at ${to_scan} now: ${convertToUTCTime(new Date())}`);
                    await processEventRecords(
                        newCache,
                        multi,
                        signedBlock,
                        to_scan,
                        true,
                        abi_inw_token_contract,
                        abi_token_generator_contract,
                        api,
                        inw_contract,
                        eventTransferCollection,
                        eventPoolCollection,
                        poolsCollection,
                        nftPoolsCollection,
                        lpPoolCollection
                    );
                    console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_RE_SCANNED} - Stop reScanEventBlocks at ${to_scan} now: ${convertToUTCTime(new Date())}`);
                    try {
                      await reScannedBlocksCollection.updateOne(
                        {
                          lastScanned: true,
                        },
                        {
                          $set: {
                            lastScanned: true,
                            blockNumber: to_scan,
                            updatedTime: new Date(),
                          },
                        },
                        {upsert: true},
                      );
                    } catch (e) {
                      console.log(
                        `${CONFIG_TYPE_NAME.INW_POOL_EVENT_RE_SCANNED} - ERROR: ${e.message}`,
                      );
                    }
                }
            } catch (e) {
                // send_telegram_message("scanBlocks - " + e.message);
            }
            global_event_vars.isReScanning = false;
        }
    } catch (e) {
        console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_RE_SCANNED} - ERROR: ${e.message}`);
    }
}

export async function processEventRecords(
    newCache: RedisCache | undefined,
    multi: any,
    signedBlock: any,
    toScan: number,
    isRescan: boolean,
    abi_inw_token_contract: Abi,
    abi_token_generator_contract: Abi,
    api: ApiPromise,
    inw_contract: ContractPromise,
    eventTransferCollection: mongoDB.Collection,
    eventPoolCollection: mongoDB.Collection,
    poolsCollection: mongoDB.Collection,
    nftPoolsCollection: mongoDB.Collection,
    lpPoolCollection: mongoDB.Collection,
) {
    try {
        /**
         * Send from:   5GW1hMMrRva2NQ5E2s54kzjeQtGZfMzhQrksUDd8UU3Va6Xh
         * Send to:     5E71DGyjRFWu5KgGVhArhQMyqn4FYseUZaXnz1BmvGpkR9Mz
         * Amount:      1440000000000000
         * Token:       5H4aCwLKUpVpct6XGJzDGPPXFockNKQU2JUVNgUw6BXEPzST
         * timestamp:   2023-06-27T06:50:58.421Z
         */
        const blockHash = await api.rpc.chain.getBlockHash(toScan);
        // @ts-ignore
        const eventRecords = await api.query.system.events.at(blockHash);
        if (eventRecords) {
            // @ts-ignore
            for (const record of eventRecords) {
                const {phase, event: {data, method, section}} = record;
                console.log(`section: ${section}, method: ${method}, phase: ${phase}`);
                if (section == "contracts" && method == "ContractEmitted") {
                    const contract_address = data.toHuman().contract;
                    const caller = data.toHuman().caller;
                    // console.log({
                    //     ...data.toHuman(),
                    //     caller: caller,
                    //     contract_address: contract_address
                    // });
                    const [accId, bytes] = data.map((data: any, _: any) => data).slice(0, 2);
                    const accIdString = accId.toString();
                    console.log({accIdString: accIdString});
                    const checkPool = await poolsCollection.findOne({
                        poolContract: accIdString,
                        poolGeneratorContractAddress: pool_generator_contract.CONTRACT_ADDRESS
                    });
                    const checkNftPool = await nftPoolsCollection.findOne({
                        poolContract: accIdString,
                        nftPoolGeneratorContractAddress: nft_pool_generator_contract.CONTRACT_ADDRESS
                    });
                    const checkLPPool = await lpPoolCollection.findOne({
                        poolContract: accIdString,
                        lpPoolGeneratorContractAddress: lp_pool_generator_contract.CONTRACT_ADDRESS
                    });

                    let obj;
                    let filter;
                    if (checkPool) {
                      const abi_collection_contract = new Abi(
                        pool_contract.CONTRACT_ABI,
                      );
                      const decodedEvent =
                        abi_collection_contract.decodeEvent(bytes);
                      let event_name = decodedEvent.event.identifier;
                      const eventValues = [];
                      for (let i = 0; i < decodedEvent.args.length; i++) {
                        const value = decodedEvent.args[i];
                        eventValues.push(value.toString());
                      }

                      if (
                        [
                          'PoolUnstakeEvent',
                          'PoolStakeEvent',
                          'PoolClaimEvent',
                        ].includes(event_name) &&
                        !isRescan
                      ) {
                        send_telegram_message(
                          `<b>${
                            event_name == 'PoolUnstakeEvent'
                              ? '😮Unstaking Event'
                              : event_name == 'PoolStakeEvent'
                              ? '🚀Staking Event'
                              : '🤑Reward Claim Event'
                          }</b>
<b>${checkPool?.tokenSymbol} Pool:</b>
<a href="${process.env.FRONTEND_URL}/#/pools/${
                            eventValues[0]?.toString() || '***'
                          }">${eventValues[0]?.toString() || '***'}</a>
<b>From:</b> <code>${(await resolveDomain(eventValues?.[2]?.toString())) || '***'}</code>
<b>Amount: </b> <code>${
                            eventValues[3]
                              ? formatNumDynDecimal(
                                  parseFloat(
                                    convertNumberWithoutCommas(
                                      eventValues[3].toString(),
                                    ),
                                  ) /
                                    Math.pow(
                                      10,
                                      parseInt(checkPool?.tokenDecimal),
                                    ),
                                )
                              : ''
                          } ${checkPool?.tokenSymbol || '***'}</code>
<b>Token contract:</b>
<code>${eventValues[1]?.toString()}</code>`,
                          process.env.TELEGRAM_ID_CHAT || '',
                          process.env.TELEGRAM_GROUP_FEED_THREAD_ID || '',
                        );
                      }

                      if (event_name == 'PoolUnstakeEvent') {
                        obj = new EventPool({
                          blockNumber: toScan,
                          eventName: 'PoolUnstakeEvent',
                          poolAddress: eventValues[0]?.toString(),
                          tokenAddress: eventValues[1]?.toString(),
                          callerAddress: eventValues[2]?.toString(),
                          amount: eventValues[3]
                            ? convertNumberWithoutCommas(
                                eventValues[3].toString(),
                              )
                            : '',
                          createdTime: new Date(),
                          updatedTime: new Date(),
                        });
                      } else if (event_name == 'PoolStakeEvent') {
                        obj = new EventPool({
                          blockNumber: toScan,
                          eventName: 'PoolStakeEvent',
                          poolAddress: eventValues[0]?.toString(),
                          tokenAddress: eventValues[1]?.toString(),
                          callerAddress: eventValues[2]?.toString(),
                          amount: eventValues[3]
                            ? convertNumberWithoutCommas(
                                eventValues[3].toString(),
                              )
                            : '',
                          createdTime: new Date(),
                          updatedTime: new Date(),
                        });
                      } else if (event_name == 'PoolClaimEvent') {
                        obj = new EventPool({
                          blockNumber: toScan,
                          eventName: 'PoolClaimEvent',
                          poolAddress: eventValues[0]?.toString(),
                          tokenAddress: eventValues[1]?.toString(),
                          callerAddress: eventValues[2]?.toString(),
                          amount: eventValues[3]
                            ? convertNumberWithoutCommas(
                                eventValues[3].toString(),
                              )
                            : '',
                          createdTime: new Date(),
                          updatedTime: new Date(),
                        });
                      }
                      if (obj) {
                        filter = {
                          blockNumber: toScan,
                          eventName: obj.eventName ? obj.eventName : '',
                          poolAddress: obj.poolAddress ? obj.poolAddress : '',
                          tokenAddress: obj.tokenAddress
                            ? obj.tokenAddress
                            : '',
                          callerAddress: obj.callerAddress
                            ? obj.callerAddress
                            : '',
                          amount: obj.amount ? obj.amount : '',
                        };
                      }
                    } else if (checkNftPool) {
                      const abi_collection_contract = new Abi(
                        nft_pool_contract.CONTRACT_ABI,
                      );
                      const decodedEvent =
                        abi_collection_contract.decodeEvent(bytes);
                      let event_name = decodedEvent.event.identifier;
                      const eventValues = [];
                      for (let i = 0; i < decodedEvent.args.length; i++) {
                        const value = decodedEvent.args[i];
                        eventValues.push(value.toString());
                      }
                      const callerAzeroID = await resolveDomain(
                        eventValues?.[2]?.toString() || "",
                      );

                      const data = new URLSearchParams();
                      data.append(
                        'collection_address',
                        checkNftPool?.NFTtokenContract,
                      );
                      const nftData = await axios.post(
                        `${process.env.ARTZERO_API_BASE_URL}/getCollectionByAddress`,
                        {
                          collection_address: checkNftPool?.NFTtokenContract,
                        },
                        {
                          headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                          },
                        },
                      );
                      const {ret} = nftData.data;

                      if (
                        ['NFTPoolUnstakeEvent', 'NFTPoolStakeEvent'].includes(
                          event_name,
                        ) &&
                        !isRescan
                      ) {                        
                        send_telegram_message(
                          `<b>${
                            event_name == 'NFTPoolUnstakeEvent'
                              ? '😮Unstaking Event'
                              : '🚀Staking Event'
                          }</b>
<b>NFT Pool:</b>
<a href="${process.env.FRONTEND_URL}/#/farms/${
                            eventValues[0]?.toString() || '***'
                          }">${eventValues[0]?.toString() || '***'}</a>
${
  ret?.[0]?.name &&
  checkNftPool?.tokenName &&
  `------------------------------
Stake <code>${ret?.[0]?.name}</code>
Earn <code>${checkNftPool?.tokenName}</code>
------------------------------`
}
<b>From:</b>
<code>${
                            eventValues[2]
                              ? callerAzeroID || eventValues[2]?.toString()
                              : '***' 
                          }</code>
<b>NFT TokenID: </b> <code>#${
                            eventValues[3]
                              ? JSON.parse(eventValues[3])?.u64
                              : ''
                          }</code>
<b>NFT Contract address:</b>
<code>${eventValues[1]?.toString()}</code>`,
                          process.env.TELEGRAM_ID_CHAT || '',
                          process.env.TELEGRAM_GROUP_FEED_THREAD_ID || '',
                        );
                      }
                      if (event_name == 'NFTPoolUnstakeEvent') {
                        obj = new EventPool({
                          blockNumber: toScan,
                          eventName: 'NFTPoolUnstakeEvent',
                          poolAddress: eventValues[0]?.toString(),
                          nftContractAddress: eventValues[1]?.toString(),
                          callerAddress: eventValues[2]?.toString(),
                          nftTokenId: eventValues[3]
                            ? eventValues[3].toString()
                            : '',
                          createdTime: new Date(),
                          updatedTime: new Date(),
                        });
                        filter = {
                          blockNumber: toScan,
                          eventName: obj.eventName ? obj.eventName : '',
                          poolAddress: obj.poolAddress ? obj.poolAddress : '',
                          nftContractAddress: obj.nftContractAddress
                            ? obj.nftContractAddress
                            : '',
                          callerAddress: obj.callerAddress
                            ? obj.callerAddress
                            : '',
                          nftTokenId: obj.nftTokenId ? obj.nftTokenId : '',
                          amount: obj.amount
                            ? convertNumberWithoutCommas(obj.amount)
                            : '',
                        };
                      } else if (event_name == 'NFTPoolStakeEvent') {
                        obj = new EventPool({
                          blockNumber: toScan,
                          eventName: 'NFTPoolStakeEvent',
                          poolAddress: eventValues[0]?.toString(),
                          nftContractAddress: eventValues[1]?.toString(),
                          callerAddress: eventValues[2]?.toString(),
                          nftTokenId: eventValues[3]
                            ? eventValues[3].toString()
                            : '',
                          createdTime: new Date(),
                          updatedTime: new Date(),
                        });
                        filter = {
                          blockNumber: toScan,
                          eventName: obj.eventName ? obj.eventName : '',
                          poolAddress: obj.poolAddress ? obj.poolAddress : '',
                          nftContractAddress: obj.nftContractAddress
                            ? obj.nftContractAddress
                            : '',
                          callerAddress: obj.callerAddress
                            ? obj.callerAddress
                            : '',
                          nftTokenId: obj.nftTokenId ? obj.nftTokenId : '',
                          amount: obj.amount
                            ? convertNumberWithoutCommas(obj.amount)
                            : '',
                        };
                      } else if (event_name == 'NFTPoolClaimEvent') {
                        send_telegram_message(
                          `<b>${'🤑Reward Claim Event'}</b>
<b>NFT Pool:</b>
<a href="${process.env.FRONTEND_URL}/#/farms/${
                            eventValues[0]?.toString() || '***'
                          }">${eventValues[0]?.toString() || '***'}</a>
${
  ret?.[0]?.name &&
  checkNftPool?.tokenName &&
  `------------------------------
Stake <code>${ret?.[0]?.name}</code>
Earn <code>${checkNftPool?.tokenName}</code>
------------------------------`
}
<b>From:</b> <code>${callerAzeroID || '***'}</code>
<b>Amount: </b> <code>${
                            eventValues[3]
                              ? formatNumDynDecimal(
                                  parseFloat(
                                    convertNumberWithoutCommas(
                                      eventValues[3].toString(),
                                    ),
                                  ) /
                                    Math.pow(
                                      10,
                                      parseInt(checkNftPool?.tokenDecimal),
                                    ),
                                )
                              : ''
                          } ${checkNftPool?.tokenSymbol || '***'}</code>
<b>Token contract </b> <code>${eventValues[1]?.toString()}</code>`,
                          process.env.TELEGRAM_ID_CHAT || '',
                          process.env.TELEGRAM_GROUP_FEED_THREAD_ID || '',
                        );
                        obj = new EventPool({
                          blockNumber: toScan,
                          eventName: 'NFTPoolClaimEvent',
                          poolAddress: eventValues[0]?.toString(),
                          nftContractAddress: eventValues[1]?.toString(),
                          callerAddress: eventValues[2]?.toString(),
                          amount: eventValues[3]
                            ? convertNumberWithoutCommas(
                                eventValues[3].toString(),
                              )
                            : '',
                          createdTime: new Date(),
                          updatedTime: new Date(),
                        });
                        filter = {
                          blockNumber: toScan,
                          eventName: obj.eventName ? obj.eventName : '',
                          poolAddress: obj.poolAddress ? obj.poolAddress : '',
                          nftContractAddress: obj.nftContractAddress
                            ? obj.nftContractAddress
                            : '',
                          callerAddress: obj.callerAddress
                            ? obj.callerAddress
                            : '',
                          amount: obj.amount ? obj.amount : '',
                        };
                      }
                    } else if (checkLPPool) {
                      const abi_collection_contract = new Abi(
                        lp_pool_contract.CONTRACT_ABI,
                      );
                      const decodedEvent =
                        abi_collection_contract.decodeEvent(bytes);
                      let event_name = decodedEvent.event.identifier;
                      const eventValues : any = [];
                      for (let i = 0; i < decodedEvent.args.length; i++) {
                        const value = decodedEvent.args[i];
                        eventValues.push(value.toString());
                      }

                      const callerAzeroID = await resolveDomain(
                        eventValues?.[3]?.toString(),
                      );

                      if (
                        ['LpPoolStakeEvent', 'LpPoolUnstakeEvent'].includes(
                          event_name,
                        ) &&
                        !isRescan
                      ) {
                        send_telegram_message(
                          `<b>${
                            event_name == 'LpPoolStakeEvent'
                              ? '🚀Staking Event'
                              : '😮Unstaking Event'
                          }</b>
<b>Farming:</b>
<a href="${process.env.FRONTEND_URL}/#/farming/${
                            eventValues[0]?.toString() || '***'
                          }">${eventValues[0]?.toString() || '***'}</a>
${
  checkLPPool?.lptokenName &&
  checkLPPool?.tokenName &&
  `------------------------------
Stake <code>${checkLPPool?.lptokenName}</code>
<code>${checkLPPool?.lptokenContract}</code>
Earn <code>${checkLPPool?.tokenName}</code>
<code>${checkLPPool?.tokenContract}</code>
------------------------------`
}
<b>From:</b> <code>${callerAzeroID || '***'}</code>
<b>Amount: </b> <code>${
                            eventValues[4]
                              ? formatNumDynDecimal(
                                  parseFloat(eventValues?.[4]) /
                                    Math.pow(
                                      10,
                                      parseInt(checkLPPool?.lptokenDecimal),
                                    ),
                                )
                              : ''
                          } ${checkLPPool?.lptokenSymbol || '***'}</code>`,
                          process.env.TELEGRAM_ID_CHAT || '',
                          process.env.TELEGRAM_GROUP_FEED_THREAD_ID || '',
                        );
                      }
                      if (event_name == 'LpPoolUnstakeEvent') {
                        obj = new EventPool({
                          blockNumber: toScan,
                          eventName: 'LpPoolUnstakeEvent',
                          poolAddress: eventValues?.[0]?.toString(),
                          lptokenContract: eventValues[1]?.toString(),
                          tokenContract: eventValues[2]?.toString(),
                          callerAddress: eventValues[3]?.toString(),
                          amount: eventValues[4]
                            ? convertNumberWithoutCommas(
                                eventValues[4].toString(),
                              )
                            : '',
                          createdTime: new Date(),
                          updatedTime: new Date(),
                        });
                        filter = {
                          blockNumber: toScan,
                          eventName: obj?.eventName || '',
                          poolAddress: obj?.poolAddress || '',
                          lptokenContract: obj?.lptokenContract || '',
                          callerAddress: obj?.callerAddress || '',
                          nftTokenId: obj?.nftTokenId || '',
                          amount: obj?.amount
                            ? convertNumberWithoutCommas(obj.amount)
                            : '',
                        };
                      } else if (event_name == 'LpPoolStakeEvent') {
                        obj = new EventPool({
                          blockNumber: toScan,
                          eventName: 'LpPoolStakeEvent',
                          poolAddress: eventValues[0]?.toString(),
                          lptokenContract: eventValues[1]?.toString(),
                          tokenContract: eventValues[2]?.toString(),
                          callerAddress: eventValues[3]?.toString(),
                          amount: eventValues[4]
                            ? convertNumberWithoutCommas(
                                eventValues[4].toString(),
                              )
                            : '',
                          createdTime: new Date(),
                          updatedTime: new Date(),
                        });
                        filter = {
                          blockNumber: toScan,
                          eventName: obj?.eventName || '',
                          poolAddress: obj?.poolAddress || '',
                          lptokenContract: obj?.lptokenContract || '',
                          callerAddress: obj?.callerAddress || '',
                          nftTokenId: obj?.nftTokenId || '',
                          amount: obj?.amount
                            ? convertNumberWithoutCommas(obj.amount)
                            : '',
                        };
                      } else if (event_name == 'LpPoolClaimEvent') {
                        send_telegram_message(
                          `<b>🤑Reward Claim Event</b>
<b>Farming:</b>
<a href="${process.env.FRONTEND_URL}/#/farming/${
                            eventValues[0]?.toString() || '***'
                          }">${eventValues[0]?.toString() || '***'}</a>
${
  checkLPPool?.lptokenName &&
  checkLPPool?.tokenName &&
  `------------------------------
Stake: <code>${checkLPPool?.lptokenName}</code>
<code>${checkLPPool?.lptokenContract}</code>
Earn : <code>${checkLPPool?.tokenName}</code>
<code>${checkLPPool?.tokenContract}</code>
------------------------------`
}
<b>From:</b> <code>${callerAzeroID || '***'}</code>
<b>Amount: </b> <code>${
                            eventValues[4]
                              ? formatNumDynDecimal(
                                  parseFloat(eventValues[4]) /
                                    Math.pow(
                                      10,
                                      parseInt(checkLPPool?.tokenDecimal),
                                    ),
                                )
                              : ''
                          } ${checkLPPool?.tokenSymbol || '***'}</code>`,
                          process.env.TELEGRAM_ID_CHAT || '',
                          process.env.TELEGRAM_GROUP_FEED_THREAD_ID || '',
                        );
                        obj = new EventPool({
                          blockNumber: toScan,
                          eventName: 'LpPoolClaimEvent',
                          poolAddress: eventValues[0]?.toString(),
                          lptokenContract: eventValues[1]?.toString(),
                          tokenContract: eventValues[2]?.toString(),
                          callerAddress: eventValues[3]?.toString(),
                          amount: eventValues[4]
                            ? convertNumberWithoutCommas(
                                eventValues[4].toString(),
                              )
                            : '',
                          createdTime: new Date(),
                          updatedTime: new Date(),
                        });
                        filter = {
                          blockNumber: toScan,
                          eventName: obj?.eventName || '',
                          poolAddress: obj?.poolAddress || '',
                          lptokenContract: obj?.lptokenContract || '',
                          callerAddress: obj?.callerAddress || '',
                          nftTokenId: obj?.nftTokenId || '',
                          amount: obj?.amount
                            ? convertNumberWithoutCommas(obj.amount)
                            : '',
                        };
                      }
                    }
                    if (obj && filter) {
                        const eventData = await eventPoolCollection.findOne(filter);
                        if (!eventData) {
                            await eventPoolCollection.insertOne({
                                ...filter,
                                data: data.toHuman(),
                                createdTime: new Date(),
                                updatedTime: new Date(),
                            });
                        } else {
                            await eventPoolCollection.updateMany(filter,{
                                    "$set": {
                                        ...filter,
                                        data: data.toHuman(),
                                        createdTime: new Date(),
                                        updatedTime: new Date(),
                                    }
                                },
                                { upsert: true });
                        }
                    }
                }

                // if ((section == "balances" && (method == "Transfer" || method == "Deposit" || method == "Reserved"))
                //     || (section == "treasury" && (method == "Deposit"))
                // ) {
                //     console.log(data.toHuman());
                //     // const [from, to, bytes] = data.map((data: any, _: any) => data).slice(0, 2);
                //     // const from_address = from.toString();
                //     // const to_address = to.toString();
                //     // console.log({
                //     //     from_address: from_address,
                //     //     to_address: to_address,
                //     //     amount: bytes.toString(),
                //     // })
                //     // let decodedMessage = inw_contract.abi.decodeMessage(compactAddLength(bytes));
                //     // if (decodedMessage?.args) {
                //     //     for(const item of decodedMessage?.args) {
                //     //         console.log(item.toHuman());
                //     //     }
                //     // }
                // }
            }
        }

        let index= 0;
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

            // if (isSigned) {
            //     // console.log(ex.toHuman());
            //     try {
            //         let decodedMessage = inw_contract.abi.decodeMessage(compactAddLength(hexToU8a(args?.data)));
            //         // console.log(decodedMessage);
            //         // if (decodedMessage?.args) {
            //         //     for(const item of decodedMessage?.args) {
            //         //         console.log(item.toHuman());
            //         //     }
            //         // }
            //     } catch (e) {
            //         console.log(`${CONFIG_TYPE_NAME.INW_POOL_EVENT_SCANNED} - ERROR: ${e.message}`);
            //     }
            // }

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


                // TODO: Switch to redis caching here
                const filter = {
                    blockNumber: toScan,
                    eventIndex: index,
                    fromAddress: newData.signer ? newData.signer.toString() : '',
                    toAddress: newData.to ? newData.to.toString() : '',
                    tokenAddress: newData.tokenContract ? newData.tokenContract.toString() : '',
                    amount: newData.amount ? convertNumberWithoutCommas(newData.amount) : 0,
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
                  await eventTransferCollection.updateMany(
                    filter,
                    {
                      $set: {
                        ...filter,
                        data: newData,
                        createdTime: new Date(),
                        updatedTime: new Date(),
                      },
                    },
                    {upsert: true},
                  );
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

export async function processUpdateStats(
  statsSchemaRepository: StatsSchemaRepository,
  poolsSchemaRepository: PoolsSchemaRepository,
  nftPoolsSchemaRepository: NftPoolsSchemaRepository,
  lpPoolsSchemaRepository: LpPoolsSchemaRepository,
): Promise<{tvlInAzero: any; tvlInUSD: any} | undefined> {
  try {
    const pools = await poolsSchemaRepository.find({});
    const totalLocked = pools.reduce(
      (total, pool) => {
        if (pool.tokenContract === process.env.INW_ADDRESS) {
          total.totalInw =
            total.totalInw +
            Number(pool.totalStaked) +
            Number(pool.rewardPool) * 10 ** 12;
        }
        if (pool.tokenContract === process.env.WAZERO_ADDRESS) {
          total.totalwAzero =
            total.totalwAzero +
            Number(pool.totalStaked) +
            Number(pool.rewardPool) * 10 ** 12;
        }
        return total;
      },
      {
        totalInw: 0,
        totalwAzero: 0,
      },
    );
    const valueInAzero =
      prices.inw * totalLocked.totalInw + totalLocked.totalwAzero;
    const poolsLp = await lpPoolsSchemaRepository.find({});
    const totalLpLocked = poolsLp.reduce(
      (total, pool) => {
        if (pool.tokenContract === process.env.INW_ADDRESS) {
          total.totalInw += Number(pool.rewardPool) * 10 ** 12;
        }
        if (pool.tokenContract === process.env.WAZERO_ADDRESS) {
          total.totalwAzero += Number(pool.rewardPool) * 10 ** 12;
        }
        if (pool.lptokenContract === process.env.INW_ADDRESS) {
          total.totalInw += Number(pool.totalStaked);
        }
        if (pool.lptokenContract === process.env.WAZERO_ADDRESS) {
          total.totalwAzero += Number(pool.totalStaked);
        }
        return total;
      },
      {
        totalInw: 0,
        totalwAzero: 0,
      },
    );
    const valueLpInAzero =
      prices.inw * totalLpLocked.totalInw + totalLpLocked.totalwAzero;
    const ret = await getAllFloorPriceArtZero();
    const calculatedValues = await Promise.all(
      ret.map(async (collection: any) => {
        const nftPoolSchemaEntry = await nftPoolsSchemaRepository.find({
          where: {
            NFTtokenContract: collection.collection,
          },
        });
        if (nftPoolSchemaEntry.length > 0) {
          const totalNftVal = nftPoolSchemaEntry.reduce(
            (total, pool) =>
              total + collection.floorPrice * Number(pool.totalStaked),
            0,
          );
          return totalNftVal;
        }
        return 0;
      }),
    );
    const sumNftValue = calculatedValues.reduce((acc, value) => acc + value, 0);
    const totalValue = sumNftValue + valueInAzero + valueLpInAzero;
    const priceA0 = await getAzeroPrice('AZERO');
    const statsList = await statsSchemaRepository.find();
    const tvlInAzero = Number(totalValue / 10 ** 12).toString();
    const tvlInUSD = Number(
      (priceA0 * totalValue || totalValue) / 10 ** 12,
    ).toString();
    if (statsList?.length > 0) {
      await statsSchemaRepository.updateById(statsList[0]._id, {
        tvlInAzero,
        tvlInUSD,
      });
    } else {
      await statsSchemaRepository.create({
        tvlInAzero,
        tvlInUSD,
      });
    }
    return {tvlInAzero, tvlInUSD};
  } catch (e) {
    console.log(`${CONFIG_TYPE_NAME.STATS} - ERROR: ${e.message}`);
  }
}