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
    LaunchpadsSchemaRepository,
    LpPoolsSchemaRepository, NftPoolsSchemaRepository,
    PoolsSchemaRepository,
    TokensSchemaRepository,
    UpdateQueueSchemaRepository
} from "../repositories";
import {checkAll} from "../utils/Pools";
import { pool_contract } from "../contracts/pool";
import { lp_pool_generator_contract } from "../contracts/lp_pool_generator";
import { lp_pool_contract } from "../contracts/lp_pool";
import { nft_pool_generator_contract } from "../contracts/nft_pool_generator";
import { nft_pool_contract } from "../contracts/nft_pool";
import { token_generator_contract } from "../contracts/token_generator";
import {global_vars, SOCKET_STATUS} from "./global";
import {globalApi} from "../index";
import { launchpad_generator_contract } from "../contracts/launchpad_generator";

@cronJob()
export class CronJobUpdateAllPools implements Provider<CronJob> {
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
        @repository(LaunchpadsSchemaRepository)
        public launchpadsSchemaRepository : LaunchpadsSchemaRepository,
    ) {
    }

    value() {
        return new CronJob({
            cronTime: CRONJOB_TIME.INW_POOL,
            onTick: async () => {
                try {
                    // console.log(CRONJOB_ENABLE, 'CRONJOB_ENABLE');
                    
                    if (CRONJOB_ENABLE.INW_POOL) {
                        const currentTime = convertToUTCTime(new Date());
                        console.log("RUN JOB CronJobUpdateAllPools NOW: " + currentTime);

                        const poolsRepo = this.poolsSchemaRepository;
                        const lpPoolsRepo = this.lpPoolsSchemaRepository;
                        const tokensRepo = this.tokensSchemaRepository;
                        const nftPoolsRepo = this.nftPoolsSchemaRepository;
                        const launchpadsRepo = this.launchpadsSchemaRepository

                        if (!(global_vars.socketStatus == SOCKET_STATUS.CONNECTED && globalApi)) return;
                        console.log(`${CONFIG_TYPE_NAME.INW_POOL} - InkWhale CronJobUpdateAllPools is active!`);

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
                        const launchpad_generator_calls = new ContractPromise(
                            globalApi,
                            launchpad_generator_contract.CONTRACT_ABI,
                            launchpad_generator_contract.CONTRACT_ADDRESS
                        );

                        await checkAll(
                            globalApi,
                            pool_generator_calls,
                            pool_contract_calls,
                            nft_pool_generator_calls,
                            nft_pool_contract_calls,
                            lp_pool_generator_calls,
                            lp_pool_contract_calls,
                            token_generator_calls,
                            launchpad_generator_calls,
                            poolsRepo,
                            nftPoolsRepo,
                            lpPoolsRepo,
                            tokensRepo,
                            launchpadsRepo
                        );
                    }
                } catch (e) {
                    console.log(`ERROR: CronJobUpdateAllPools - ${e.message}`);
                }
            },
            start: true,
        });
    }
}