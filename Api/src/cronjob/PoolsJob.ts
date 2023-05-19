import {
    CONFIG_TYPE_NAME,
    CRONJOB_ENABLE,
    CRONJOB_TIME,
} from "../utils/constant";
import { Provider} from '@loopback/core';
import {CronJob, cronJob} from '@loopback/cron';
import {convertToUTCTime} from "../utils/Tools";
import {repository} from "@loopback/repository";
import {pool_generator_contract} from "../contracts/pool_generator";
import {ApiPromise, WsProvider} from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import {ContractPromise} from "@polkadot/api-contract";
import {
    LpPoolsSchemaRepository, NftPoolsSchemaRepository,
    PoolsSchemaRepository,
    TokensSchemaRepository,
    UpdateQueueSchemaRepository
} from "../repositories";
import {checkAll, checkQueue, owner, tokenDecimals, tokenName, tokenSymbol, totalSupply} from "../utils/Pools";
import { pool_contract } from "../contracts/pool";
import { lp_pool_generator_contract } from "../contracts/lp_pool_generator";
import { lp_pool_contract } from "../contracts/lp_pool";
import { nft_pool_generator_contract } from "../contracts/nft_pool_generator";
import { nft_pool_contract } from "../contracts/nft_pool";
import { psp22_contract } from "../contracts/psp22";
import { token_generator_contract } from "../contracts/token_generator";
import {global_vars, SOCKET_STATUS} from "./global";
import {globalApi} from "../index";

@cronJob()
export class CronJobUpdatePools implements Provider<CronJob> {
    constructor(
        @repository(PoolsSchemaRepository)
        public poolsSchemaRepository : PoolsSchemaRepository,
        @repository(UpdateQueueSchemaRepository)
        public updateQueueSchemaRepository : UpdateQueueSchemaRepository,
        @repository(TokensSchemaRepository)
        public tokensSchemaRepository : TokensSchemaRepository,
        @repository(LpPoolsSchemaRepository)
        public lpPoolsSchemaRepository : LpPoolsSchemaRepository,
        @repository(NftPoolsSchemaRepository)
        public nftPoolsSchemaRepository : NftPoolsSchemaRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.INW_POOL,
            onTick: async () => {
                try {
                    if (CRONJOB_ENABLE.INW_POOL) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log("RUN JOB CronJobUpdatePools NOW: " + currentTime);

                        const updateQueueRepo = this.updateQueueSchemaRepository;
                        const poolsRepo = this.poolsSchemaRepository;
                        const lpPoolsRepo = this.lpPoolsSchemaRepository;
                        const tokensRepo = this.tokensSchemaRepository;
                        const nftPoolsRepo = this.nftPoolsSchemaRepository;

                        if (!(global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) return;
                        console.log(`${CONFIG_TYPE_NAME.INW_POOL} - InkWhale CronJobUpdatePools is active!`);

                        const pool_generator_calls = new ContractPromise(
                            globalApi,
                            pool_generator_contract.CONTRACT_ABI,
                            pool_generator_contract.CONTRACT_ADDRESS
                        );
                        const pool_contract_calls = new ContractPromise(
                            globalApi,
                            pool_contract.CONTRACT_ABI,
                            pool_contract.CONTRACT_ADDRESS
                        );
                        const lp_pool_generator_calls = new ContractPromise(
                            globalApi,
                            lp_pool_generator_contract.CONTRACT_ABI,
                            lp_pool_generator_contract.CONTRACT_ADDRESS
                        );
                        const lp_pool_contract_calls = new ContractPromise(
                            globalApi,
                            lp_pool_contract.CONTRACT_ABI,
                            lp_pool_contract.CONTRACT_ADDRESS
                        );
                        const nft_pool_generator_calls = new ContractPromise(
                            globalApi,
                            nft_pool_generator_contract.CONTRACT_ABI,
                            nft_pool_generator_contract.CONTRACT_ADDRESS
                        );
                        const nft_pool_contract_calls = new ContractPromise(
                            globalApi,
                            nft_pool_contract.CONTRACT_ABI,
                            nft_pool_contract.CONTRACT_ADDRESS
                        );
                        const token_generator_calls = new ContractPromise(
                            globalApi,
                            token_generator_contract.CONTRACT_ABI,
                            token_generator_contract.CONTRACT_ADDRESS
                        );


                        // TODO: Run at the first time after rebuilding new contract
                        if ((process.env.IS_NEW_INW == "true")) {
                            const inwToken = process.env.INW_ADDRESS;
                            if (inwToken) {
                                let psp22_contract_calls = new ContractPromise(
                                    globalApi,
                                    psp22_contract.CONTRACT_ABI,
                                    inwToken
                                );
                                let _owner = await owner(globalApi, psp22_contract_calls, '');
                                let _tokenName = await tokenName(globalApi, '', psp22_contract_calls);
                                let _tokenSymbol = await tokenSymbol(globalApi, '', psp22_contract_calls);
                                let _tokenDecimal = await tokenDecimals(globalApi, '', psp22_contract_calls);
                                let _tokenTotalSupply = await totalSupply(globalApi, '', psp22_contract_calls);
                                const currentToken = await tokensRepo.findOne({
                                    where: {
                                        contractAddress: inwToken,
                                        tokenGeneratorContractAddress: token_generator_contract.CONTRACT_ADDRESS
                                    }
                                });
                                if (currentToken) {
                                    console.log(`updateById data for INW`);
                                    try {
                                        await tokensRepo.updateById(currentToken._id, {
                                            name: _tokenName,
                                            symbol: _tokenSymbol,
                                            decimal: _tokenDecimal,
                                            creator: _owner,
                                            mintTo: undefined,
                                            totalSupply: _tokenTotalSupply,
                                            index: 0,
                                            updatedTime: new Date()
                                        });
                                    } catch (e) {
                                        console.log(`ERROR: ProcessTokens updateById - ${e.message}`);
                                    }
                                } else {
                                    console.log(`create new data for INW`);
                                    try {
                                        await tokensRepo.create({
                                            name: _tokenName,
                                            symbol: _tokenSymbol,
                                            decimal: _tokenDecimal,
                                            creator: _owner,
                                            mintTo: undefined,
                                            totalSupply: _tokenTotalSupply,
                                            index: 0,
                                            contractAddress: inwToken,
                                            tokenGeneratorContractAddress: token_generator_contract.CONTRACT_ADDRESS,
                                            createdTime: new Date(),
                                            updatedTime: new Date()
                                        });
                                    } catch (e) {
                                        console.log(`ERROR: ProcessTokens create - ${e.message}`);
                                    }
                                }
                            }
                        }

                        await checkQueue(
                            globalApi,
                            pool_generator_calls,
                            nft_pool_generator_calls,
                            lp_pool_generator_calls,
                            token_generator_calls,
                            nft_pool_contract_calls,
                            lp_pool_contract_calls,
                            pool_contract_calls,
                            updateQueueRepo,
                            nftPoolsRepo,
                            tokensRepo,
                            poolsRepo,
                            lpPoolsRepo
                        );
                    }
                } catch (e) {
                    console.log(`ERROR: CronJobUpdatePools - ${e.message}`);
                }
            },
            start: true,
        });
    }
}