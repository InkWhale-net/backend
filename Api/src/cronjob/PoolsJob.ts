import {
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
import {checkAll, checkQueue} from "../utils/Pools";
import { pool_contract } from "../contracts/pool";
import { lp_pool_generator_contract } from "../contracts/lp_pool_generator";
import { lp_pool_contract } from "../contracts/lp_pool";
import { nft_pool_generator_contract } from "../contracts/nft_pool_generator";
import { nft_pool_contract } from "../contracts/nft_pool";
import { psp22_contract } from "../contracts/psp22";
import { token_generator_contract } from "../contracts/token_generator";

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

                        const provider = new WsProvider(process.env.PROVIDER);
                        const api = new ApiPromise({
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
                        api.on("connected", () => {
                            api.isReady.then((api) => {
                                console.log("Testnet InkWhale Connected");
                            });
                        });

                        api.on("ready", async () => {
                            console.log("Testnet InkWhale Ready");
                            const pool_generator_calls = new ContractPromise(
                                api,
                                pool_generator_contract.CONTRACT_ABI,
                                pool_generator_contract.CONTRACT_ADDRESS
                            );
                            const pool_contract_calls = new ContractPromise(
                                api,
                                pool_contract.CONTRACT_ABI,
                                pool_contract.CONTRACT_ADDRESS
                            );
                            const lp_pool_generator_calls = new ContractPromise(
                                api,
                                lp_pool_generator_contract.CONTRACT_ABI,
                                lp_pool_generator_contract.CONTRACT_ADDRESS
                            );
                            const lp_pool_contract_calls = new ContractPromise(
                                api,
                                lp_pool_contract.CONTRACT_ABI,
                                lp_pool_contract.CONTRACT_ADDRESS
                            );
                            const nft_pool_generator_calls = new ContractPromise(
                                api,
                                nft_pool_generator_contract.CONTRACT_ABI,
                                nft_pool_generator_contract.CONTRACT_ADDRESS
                            );
                            const nft_pool_contract_calls = new ContractPromise(
                                api,
                                nft_pool_contract.CONTRACT_ABI,
                                nft_pool_contract.CONTRACT_ADDRESS
                            );
                            const psp22_contract_calls = new ContractPromise(
                                api,
                                psp22_contract.CONTRACT_ABI,
                                psp22_contract.CONTRACT_ADDRESS
                            );
                            const token_generator_calls = new ContractPromise(
                                api,
                                token_generator_contract.CONTRACT_ABI,
                                token_generator_contract.CONTRACT_ADDRESS
                            );

                            await checkAll(
                                api,
                                pool_generator_calls,
                                pool_contract_calls,
                                nft_pool_generator_calls,
                                nft_pool_contract_calls,
                                lp_pool_generator_calls,
                                lp_pool_contract_calls,
                                token_generator_calls,
                                poolsRepo,
                                nftPoolsRepo,
                                lpPoolsRepo,
                                tokensRepo
                            );

                            setInterval(() => checkQueue(
                                api,
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
                            ),3000);

                            setInterval(() => checkAll(
                                api,
                                pool_generator_calls,
                                pool_contract_calls,
                                nft_pool_generator_calls,
                                nft_pool_contract_calls,
                                lp_pool_generator_calls,
                                lp_pool_contract_calls,
                                token_generator_calls,
                                poolsRepo,
                                nftPoolsRepo,
                                lpPoolsRepo,
                                tokensRepo
                            ), 60 * 1000);

                        });
                    }
                } catch (e) {
                    console.log(`ERROR: CronJobUpdatePools - ${e.message}`);
                }
            },
            start: true,
        });
    }
}