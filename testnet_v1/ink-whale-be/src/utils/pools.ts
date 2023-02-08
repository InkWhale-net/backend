import {ContractPromise} from "@polkadot/api-contract";
import {ApiPromise} from "@polkadot/api";
import {
    LpPoolsSchemaRepository,
    NftPoolsSchemaRepository,
    PoolsSchemaRepository,
    TokensSchemaRepository,
    UpdateQueueSchemaRepository
} from "../repositories";
import {readOnlyGasLimit} from "./utils";

let is_running = false;
let is_running_nft = false;
let is_running_lp = false;
let is_running_tokens = false;
let is_check_queue = false;

export const checkQueue = async (
    api: ApiPromise,
    pool_generator_calls: ContractPromise,
    nft_pool_generator_calls: ContractPromise,
    lp_pool_generator_calls: ContractPromise,
    token_generator_calls: ContractPromise,
    nft_pool_contract_calls: ContractPromise,
    lp_pool_contract_calls: ContractPromise,
    updateQueueSchemaRepository: UpdateQueueSchemaRepository,
    nftPoolsSchemaRepository: NftPoolsSchemaRepository,
    tokensSchemaRepository: TokensSchemaRepository,
    poolsSchemaRepository: PoolsSchemaRepository,
    lpPoolsSchemaRepository: LpPoolsSchemaRepository
) => {
    if (is_check_queue) return;
    is_check_queue = true;
    try {
        let queue_data = await updateQueueSchemaRepository.find({});
        let records_length = queue_data.length;

        for (let j = 0; j < records_length; j++) {
            let poolContract: string = queue_data[j].poolContract!;
            let requestType = queue_data[j].requestType;
            console.log("processing queue for ", requestType, poolContract);
            if (poolContract == "new") {
                if (requestType == "nft")
                    await checkNewNFTPools(api, nft_pool_generator_calls, nft_pool_contract_calls, nftPoolsSchemaRepository);
                else if (requestType == "lp")
                    await checkNewLPPools(api, lp_pool_generator_calls, lp_pool_contract_calls, lpPoolsSchemaRepository);
                else if (requestType == "pool")
                    await checkNewPools(api, pool_generator_calls, poolsSchemaRepository);
                else if (requestType == "token")
                    await checkNewTokens(api, tokensSchemaRepository, token_generator_calls);
            } else {
                if (requestType == "nft")
                    await ProcessNFT(poolContract, api, nft_pool_contract_calls, nftPoolsSchemaRepository);
                else if (requestType == "lp")
                    await ProcessLP(poolContract, api, lp_pool_contract_calls, lpPoolsSchemaRepository);
                else if (requestType == "pool")
                    await ProcessPool(poolContract, api, poolsSchemaRepository);
            }

            await updateQueueSchemaRepository.deleteAll({
                poolContract: poolContract
            });
        }

        is_check_queue = false;
    } catch (e) {
        console.log("checkQueue", e.message);
        is_check_queue = false;
    }

}
const ProcessNFT = async (
    poolContract: string,
    api: ApiPromise,
    nft_pool_contract_calls: ContractPromise,
    nftPoolsSchemaRepository: NftPoolsSchemaRepository
) => {
    nft_pool_contract_calls = new ContractPromise(
        api,
        nft_pool_contract.CONTRACT_ABI,
        poolContract,
    );
    //console.log(pool_contract);
    let _multiplier = await multiplier(api, nft_pool_contract_calls, '');
    let _rewardPool = await rewardPool(api, nft_pool_contract_calls, '');
    let _totalStaked = await totalStaked(api, nft_pool_contract_calls, '', true);
    let _startTime = await startTime(api, nft_pool_contract_calls, '');
    let _duration = await duration(api, nft_pool_contract_calls, '');
    let _tokenContract: string = await psp22ContractAddress(api, nft_pool_contract_calls, '');
    let _NFTtokenContract = await psp34ContractAddress(api, nft_pool_contract_calls, '');
    let _owner = await owner(api, nft_pool_contract_calls, '');

    if (!_tokenContract) return;
    //console.log(poolContract,apy,rewardPool,totalStaked,tokenContract);
    let psp22_contract_calls = new ContractPromise(
        api,
        psp22_contract.CONTRACT_ABI,
        _tokenContract,
    );

    let _tokenName = await tokenName(api, '', psp22_contract_calls);
    let _tokenSymbol = await tokenSymbol(api, '', psp22_contract_calls);
    let _tokenDecimal = await tokenDecimals(api, '', psp22_contract_calls);
    let _tokenTotalSupply = await totalSupply(api, '', psp22_contract_calls);

    let collection = await nftPoolsSchemaRepository.findOne({
        where: {
            poolContract: poolContract
        }
    });

    if (collection) {
        //console.log('Already Exists, update',poolContract,_rewardPool);
        // await database.NFTPools.updateOne({poolContract},{
        //     NFTtokenContract: _NFTtokenContract,
        //     tokenContract: _tokenContract,
        //     tokenName: _tokenName,
        //     tokenSymbol: _tokenSymbol,
        //     tokenDecimal: _tokenDecimal,
        //     duration: _duration,
        //     startTime: _startTime,
        //     tokenTotalSupply: _tokenTotalSupply,
        //     rewardPool: _rewardPool,
        //     totalStaked: _totalStaked,
        //     multiplier: _multiplier,
        //     owner: _owner
        // });
        await nftPoolsSchemaRepository.updateAll(
            {
                NFTtokenContract: _NFTtokenContract,
                tokenContract: _tokenContract,
                tokenName: _tokenName,
                tokenSymbol: _tokenSymbol,
                tokenDecimal: _tokenDecimal,
                duration: _duration ? _duration : 0,
                startTime: _startTime ? _startTime : 0,
                tokenTotalSupply: _tokenTotalSupply ? _tokenTotalSupply : 0,
                rewardPool: _rewardPool ? _rewardPool : 0,
                totalStaked: _totalStaked ? _totalStaked : 0,
                multiplier: _multiplier,
                owner: _owner
            }, {
                poolContract: poolContract
            });
    } else {
        // let create_collection = await database.NFTPools.create({
        //     poolContract,
        //     tokenContract: _tokenContract,
        //     tokenName: _tokenName,
        //     tokenSymbol: _tokenSymbol,
        //     tokenDecimal: _tokenDecimal,
        //     duration: _duration,
        //     startTime: _startTime,
        //     tokenTotalSupply: _tokenTotalSupply,
        //     rewardPool: _rewardPool,
        //     totalStaked: _totalStaked,
        //     multiplier: _multiplier,
        // });
        await nftPoolsSchemaRepository.create({
            poolContract,
            tokenContract: _tokenContract,
            tokenName: _tokenName,
            tokenSymbol: _tokenSymbol,
            tokenDecimal: _tokenDecimal,
            duration: _duration ? _duration : 0,
            startTime: _startTime ? _startTime : 0,
            tokenTotalSupply: _tokenTotalSupply ? _tokenTotalSupply : 0,
            rewardPool: _rewardPool ? _rewardPool : 0,
            totalStaked: _totalStaked ? _totalStaked : 0,
            multiplier: _multiplier,
        });
    }
}
const ProcessPool = async (
    poolContract: string,
    api: ApiPromise,
    poolsSchemaRepository : PoolsSchemaRepository,
) => {
    let pool_contract_calls = new ContractPromise(
        api,
        pool_contract.CONTRACT_ABI,
        poolContract,
    );
    //console.log(pool_contract);
    let _apy = await apy(api, pool_contract_calls, '');
    let _rewardPool = await rewardPool(api, pool_contract_calls, '');
    let _totalStaked = await totalStaked(api, pool_contract_calls, '', false);
    let _startTime = await startTime(api, pool_contract_calls, '');
    let _duration = await duration(api, pool_contract_calls, '');
    let _tokenContract: string = await psp22ContractAddress(api, pool_contract_calls, '');
    let _owner = await owner(api, pool_contract_calls, '');

    if (!_tokenContract) return;
    //console.log(poolContract,apy,rewardPool,totalStaked,tokenContract);
    let psp22_contract_calls = new ContractPromise(
        api,
        psp22_contract.CONTRACT_ABI,
        _tokenContract,
    );

    let _tokenName = await tokenName(api, '', psp22_contract_calls);
    let _tokenSymbol = await tokenSymbol(api, '', psp22_contract_calls);
    let _tokenDecimal = await tokenDecimals(api, '', psp22_contract_calls);
    let _tokenTotalSupply = await totalSupply(api, '', psp22_contract_calls);

    // let collection = await database.Pools.findOne({poolContract});
    let collection = await poolsSchemaRepository.findOne({
        where: {
            poolContract: poolContract
        }
    });

    if (collection) {
        //console.log('Already Exists, update',poolContract,_rewardPool);
        // await database.Pools.updateOne({poolContract}, {
        //     tokenContract: _tokenContract,
        //     tokenName: _tokenName,
        //     tokenSymbol: _tokenSymbol,
        //     tokenDecimal: _tokenDecimal,
        //     duration: _duration,
        //     startTime: _startTime,
        //     tokenTotalSupply: _tokenTotalSupply,
        //     rewardPool: _rewardPool,
        //     totalStaked: _totalStaked,
        //     apy: _apy,
        //     owner: _owner
        // });
        await poolsSchemaRepository.updateAll(
            {
                tokenContract: _tokenContract,
                tokenName: _tokenName,
                tokenSymbol: _tokenSymbol,
                tokenDecimal: _tokenDecimal,
                duration: _duration ? _duration : 0,
                startTime: _startTime ? _startTime : 0,
                tokenTotalSupply: _tokenTotalSupply ? _tokenTotalSupply : 0,
                rewardPool: _rewardPool ? _rewardPool : 0,
                totalStaked: _totalStaked ? _totalStaked : 0,
                apy: _apy,
                owner: _owner
            },
            {
                poolContract: poolContract
            }
        )
    } else {
        // let create_collection = await database.Pools.create({
        //     poolContract,
        //     tokenContract: _tokenContract,
        //     tokenName: _tokenName,
        //     tokenSymbol: _tokenSymbol,
        //     tokenDecimal: _tokenDecimal,
        //     duration: _duration,
        //     startTime: _startTime,
        //     tokenTotalSupply: _tokenTotalSupply,
        //     rewardPool: _rewardPool,
        //     totalStaked: _totalStaked,
        //     apy: _apy,
        //     owner: _owner
        // });
        let create_collection = await poolsSchemaRepository.create(
            {
                poolContract,
                tokenContract: _tokenContract,
                tokenName: _tokenName,
                tokenSymbol: _tokenSymbol,
                tokenDecimal: _tokenDecimal,
                duration: _duration ? _duration : 0,
                startTime: _startTime ? _startTime : 0,
                tokenTotalSupply: _tokenTotalSupply ? _tokenTotalSupply : 0,
                rewardPool: _rewardPool ? _rewardPool : 0,
                totalStaked: _totalStaked ? _totalStaked : 0,
                apy: _apy,
                owner: _owner
            }
        );

    }
}
const ProcessLP = async (
    poolContract: string,
    api: ApiPromise,
    lp_pool_contract_calls: ContractPromise,
    lpPoolsSchemaRepository : LpPoolsSchemaRepository,
) => {
    lp_pool_contract_calls = new ContractPromise(
        api,
        lp_pool_contract.CONTRACT_ABI,
        poolContract,
    );
    //console.log(pool_contract);
    let _multiplier = await multiplier(api, lp_pool_contract_calls, '');
    let _rewardPool = await rewardPool(api, lp_pool_contract_calls, '');
    let _totalStaked = await totalStaked(api, lp_pool_contract_calls, '', false);
    let _startTime = await startTime(api, lp_pool_contract_calls, '');
    let _duration = await duration(api, lp_pool_contract_calls, '');
    let _tokenContract: string = await psp22ContractAddress(api, lp_pool_contract_calls, '');
    let _lptokenContract: string = await lpContractAddress(api, lp_pool_contract_calls, '');
    let _owner = await owner(api, lp_pool_contract_calls, '');

    if (!_tokenContract) return;
    //console.log(poolContract,apy,rewardPool,totalStaked,tokenContract);
    let psp22_contract_calls = new ContractPromise(
        api,
        psp22_contract.CONTRACT_ABI,
        _tokenContract,
    );

    let _tokenName = await tokenName(api, '', psp22_contract_calls);
    let _tokenSymbol = await tokenSymbol(api, '', psp22_contract_calls);
    let _tokenDecimal = await tokenDecimals(api, '', psp22_contract_calls);
    let _tokenTotalSupply = await totalSupply(api, '', psp22_contract_calls);

    psp22_contract_calls = new ContractPromise(
        api,
        psp22_contract.CONTRACT_ABI,
        _lptokenContract,
    );

    let _lptokenName = await tokenName(api, '', psp22_contract_calls);
    let _lptokenSymbol = await tokenSymbol(api, '', psp22_contract_calls);
    let _lptokenDecimal = await tokenDecimals(api, '', psp22_contract_calls);
    let _lptokenTotalSupply = await totalSupply(api, '', psp22_contract_calls);

    // let collection = await database.LPPools.findOne({poolContract});
    let collection = await lpPoolsSchemaRepository.findOne({
        where: {
            poolContract: poolContract
        }
    });

    if (collection) {
        //console.log('Already Exists, update',poolContract,_rewardPool);
        // await database.LPPools.updateOne({poolContract}, {
        //     lptokenContract: _lptokenContract,
        //     lptokenName: _lptokenName,
        //     lptokenSymbol: _lptokenSymbol,
        //     lptokenDecimal: _lptokenDecimal,
        //     tokenContract: _tokenContract,
        //     tokenName: _tokenName,
        //     tokenSymbol: _tokenSymbol,
        //     tokenDecimal: _tokenDecimal,
        //     duration: _duration,
        //     startTime: _startTime,
        //     tokenTotalSupply: _tokenTotalSupply,
        //     lptokenTotalSupply: _lptokenTotalSupply,
        //     rewardPool: _rewardPool,
        //     totalStaked: _totalStaked,
        //     multiplier: _multiplier,
        //     owner: _owner
        // });
        await lpPoolsSchemaRepository.updateAll(
            {
                lptokenContract: _lptokenContract,
                lptokenName: _lptokenName,
                lptokenSymbol: _lptokenSymbol,
                lptokenDecimal: _lptokenDecimal,
                tokenContract: _tokenContract,
                tokenName: _tokenName,
                tokenSymbol: _tokenSymbol,
                tokenDecimal: _tokenDecimal,
                duration: _duration ? _duration : 0,
                startTime: _startTime ? _startTime : 0,
                tokenTotalSupply: _tokenTotalSupply ? _tokenTotalSupply : 0,
                lptokenTotalSupply: _lptokenTotalSupply ? _lptokenTotalSupply : 0,
                rewardPool: _rewardPool ? _rewardPool : 0,
                totalStaked: _totalStaked ? _totalStaked : 0,
                multiplier: _multiplier,
                owner: _owner
            },
            {
                poolContract: poolContract
            }
        )
    } else {
        // let create_collection = await database.LPPools.create({
        //     poolContract,
        //     lptokenContract: _lptokenContract,
        //     lptokenName: _lptokenName,
        //     lptokenSymbol: _lptokenSymbol,
        //     lptokenDecimal: _lptokenDecimal,
        //     tokenContract: _tokenContract,
        //     tokenName: _tokenName,
        //     tokenSymbol: _tokenSymbol,
        //     tokenDecimal: _tokenDecimal,
        //     duration: _duration,
        //     startTime: _startTime,
        //     tokenTotalSupply: _tokenTotalSupply,
        //     rewardPool: _rewardPool,
        //     totalStaked: _totalStaked,
        //     multiplier: _multiplier,
        //     owner: _owner
        // });
        let create_collection = await lpPoolsSchemaRepository.create(
            {
                poolContract,
                lptokenContract: _lptokenContract,
                lptokenName: _lptokenName,
                lptokenSymbol: _lptokenSymbol,
                lptokenDecimal: _lptokenDecimal,
                tokenContract: _tokenContract,
                tokenName: _tokenName,
                tokenSymbol: _tokenSymbol,
                tokenDecimal: _tokenDecimal,
                duration: _duration ? _duration : 0,
                startTime: _startTime ? _startTime : 0,
                tokenTotalSupply: _tokenTotalSupply ? _tokenTotalSupply : 0,
                rewardPool: _rewardPool ? _rewardPool : 0,
                totalStaked: _totalStaked ? _totalStaked : 0,
                multiplier: _multiplier,
                owner: _owner
            }
        );
    }
}
const ProcessTokens = async (
    api: ApiPromise,
    token_generator_calls: ContractPromise,
    index: number,
    tokensSchemaRepository : TokensSchemaRepository,
) => {
    //console.log(index);
    let tokenInfo = await getTokenInfo(
        api,
        token_generator_calls,
        '',
        index
    );
    tokenInfo.index = index;
    console.log(tokenInfo);
    // let token = await database.Tokens.findOne({contractAddress: tokenInfo.contractAddress});
    let token = await tokensSchemaRepository.findOne({
        where: {
            contractAddress: tokenInfo.contractAddress
        }
    });

    tokenInfo.totalSupply = tokenInfo.totalSupply.replace(/\,/g, "") / (10 ** parseInt(tokenInfo.decimal));

    if (token) {
        //console.log('Already Exists, update',poolContract,_rewardPool);
        // await database.Tokens.updateOne({contractAddress: tokenInfo.contractAddress}, {
        //     name: tokenInfo.name,
        //     symbol: tokenInfo.symbol,
        //     decimal: tokenInfo.decimal,
        //     creator: tokenInfo.creator,
        //     mintTo: tokenInfo.mintTo,
        //     totalSupply: tokenInfo.totalSupply,
        //     index: tokenInfo.index
        // });
        await tokensSchemaRepository.updateAll(
            {
                name: tokenInfo.name,
                symbol: tokenInfo.symbol,
                decimal: tokenInfo.decimal,
                creator: tokenInfo.creator,
                mintTo: tokenInfo.mintTo,
                totalSupply: tokenInfo.totalSupply,
                index: tokenInfo.index
            },
            {
                contractAddress: tokenInfo.contractAddress
            }
        );
    } else {
        // await database.Tokens.create(tokenInfo);
        await tokensSchemaRepository.create(tokenInfo);
    }
}

const checkNewNFTPools = async (
    api: ApiPromise,
    nft_pool_generator_calls: ContractPromise,
    nft_pool_contract_calls: ContractPromise,
    nftPoolsSchemaRepository: NftPoolsSchemaRepository
) => {
    if (is_running_nft) {
        console.log("checkNewNFTPools is running. Do nothing.");
        return;
    }
    try {
        is_running_nft = true;
        let poolCount = await getPoolCount(api, nft_pool_generator_calls, '');
        //console.log('poolCount',poolCount);
        let pools = [];
        for (let index = poolCount; index > 0; index--) {
            // console.log(index);
            let poolContract = await getPool(
                api,
                nft_pool_generator_calls,
                '',
                index
            );
            //console.log('poolContract', poolContract);
            if (!poolContract) continue;
            await ProcessNFT(poolContract, api, nft_pool_contract_calls, nftPoolsSchemaRepository);
        }
        is_running_nft = false;
    } catch (e) {
        is_running_nft = false;
        console.log(e.message);
    }

}

const checkNewPools = async (
    api: ApiPromise,
    pool_generator_calls: ContractPromise,
    poolsSchemaRepository: PoolsSchemaRepository
) => {
    if (is_running) {
        console.log("checkNewPools is running. Do nothing.");
        return;
    }
    try {
        is_running = true;
        let poolCount = await getPoolCount(api, pool_generator_calls, '');
        //console.log('poolCount',poolCount);
        let pools = [];
        for (let index = poolCount; index > 0; index--) {
            // console.log(index);
            let poolContract = await getPool(
                api,
                pool_generator_calls,
                '',
                index
            );
            //console.log('poolContract', poolContract);
            if (!poolContract) continue;
            await ProcessPool(poolContract, api, poolsSchemaRepository);
        }
        is_running = false;
    } catch (e) {
        is_running = false;
        console.log(e.message);
    }

}

const checkNewLPPools = async (
    api: ApiPromise,
    lp_pool_generator_calls: ContractPromise,
    lp_pool_contract_calls: ContractPromise,
    lpPoolsSchemaRepository: LpPoolsSchemaRepository
) => {
    if (is_running_lp) {
        console.log("checkNewLPPools is running. Do nothing.");
        return;
    }
    try {
        is_running_lp = true;
        let poolCount = await getPoolCount(api, lp_pool_generator_calls, '');
        console.log('LP poolCount', poolCount);
        let pools = [];
        for (let index = poolCount; index > 0; index--) {
            // console.log(index);
            let poolContract = await getPool(
                api,
                lp_pool_generator_calls,
                '',
                index
            );
            //console.log('poolContract', poolContract);
            if (!poolContract) continue;
            await ProcessLP(poolContract, api, lp_pool_contract_calls, lpPoolsSchemaRepository);

        }
        is_running_lp = false;
    } catch (e) {
        is_running_lp = false;
        console.log(e.message);
    }

}

const checkNewTokens = async (
    api: ApiPromise,
    tokensSchemaRepository : TokensSchemaRepository,
    token_generator_calls: ContractPromise
) => {
    if (is_running_tokens) {
        console.log("checkNewTokens is running. Do nothing.");
        return;
    }
    try {
        is_running_tokens = true;
        let tokenCount = await getTokenCount(api, token_generator_calls, '');
        // console.log(tokenCount);
        let tokens = [];
        for (let index = tokenCount; index > 0; index--) {
            // let token = await database.Tokens.findOne({index});
            let token = await tokensSchemaRepository.findOne({
                where: {
                    index: index
                }
            });
            if (!token) {
                await ProcessTokens(api, token_generator_calls, index, tokensSchemaRepository);
            }

        }
    } catch (e) {
        is_running_tokens = false;
        console.log(e.message);
    }
    is_running_tokens = false;
}

export const checkAll = async (
    api: ApiPromise,
    pool_generator_calls: ContractPromise,
    nft_pool_generator_calls: ContractPromise,
    nft_pool_contract_calls: ContractPromise,
    lp_pool_generator_calls: ContractPromise,
    lp_pool_contract_calls: ContractPromise,
    token_generator_calls: ContractPromise,
    poolsSchemaRepository: PoolsSchemaRepository,
    nftPoolsSchemaRepository: NftPoolsSchemaRepository,
    lpPoolsSchemaRepository: LpPoolsSchemaRepository,
    tokensSchemaRepository: TokensSchemaRepository
) => {
    await checkNewPools(api, pool_generator_calls, poolsSchemaRepository);
    await checkNewNFTPools(api, nft_pool_generator_calls, nft_pool_contract_calls, nftPoolsSchemaRepository);
    await checkNewLPPools(api, lp_pool_generator_calls, lp_pool_contract_calls, lpPoolsSchemaRepository);
    await checkNewTokens(api, tokensSchemaRepository, token_generator_calls);
}

//token_generator_calls
const getTokenInfo = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string,
    index: number
) => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query["tokenManagerTrait::getTokenInfo"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit},
            index
        );
        if (result.isOk && output) {
            // @ts-ignore
            return output.toHuman()?.Ok;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const getTokenCount = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
) => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query["tokenManagerTrait::getTokenCount"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // @ts-ignore
            return output.toHuman()?.Ok.replace(/\,/g, "");
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

// pool_generator_calls
const getPoolCount = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
) => {
    if (!contract_to_call) {
        console.log('invalid', contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc';
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query["genericPoolGeneratorTrait::getPoolCount"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // console.log(output.toHuman());
            // @ts-ignore
            return output.toHuman()?.Ok.replace(/\,/g, '');
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}
const getPool = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string,
    index: number
) => {
    if (!contract_to_call) {
        console.log('invalid', contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc';
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query["genericPoolGeneratorTrait::getPool"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit},
            index
        );
        if (result.isOk && output) {
            // @ts-ignore
            return output.toHuman()?.Ok;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

// pool_contract_calls
const apy = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
) => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query.apy(
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // console.log(output.toHuman());
            // @ts-ignore
            return output.toHuman()?.Ok.replace(/\,/g, "");
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}
const multiplier = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
) => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query["genericPoolContractTrait::multiplier"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // console.log(output.toHuman());
            // @ts-ignore
            return output.toHuman()?.Ok.replace(/\,/g, "");
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const rewardPool = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
) => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query["genericPoolContractTrait::rewardPool"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // console.log(output.toHuman());
            // @ts-ignore
            const a = output.toHuman()?.Ok.replace(/\,/g, "");
            return a / 10 ** 12;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const totalStaked = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string,
    is_nft: boolean
) => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query["genericPoolContractTrait::totalStaked"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // console.log(output.toHuman());
            // @ts-ignore
            const a = output.toHuman()?.Ok.replace(/\,/g, "");
            if (is_nft) return a / 1;
            return a / 10 ** 12;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const getStakeInfo = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string,
    staker: string) => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query["genericPoolContractTrait::getStakeInfo"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit},
            staker
        );
        if (result.isOk && output) {
            // console.log(output.toHuman());
            //const a = output.toHuman().replace(/\,/g, "");
            // @ts-ignore
            return output.toHuman()?.Ok;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

// Return: string | AccountId
const psp22ContractAddress = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
) => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query["genericPoolContractTrait::psp22ContractAddress"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // @ts-ignore
            return output.toHuman()?.Ok;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const lpContractAddress = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
) => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query.lpContractAddress(
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // @ts-ignore
            return output.toHuman()?.Ok;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const psp34ContractAddress = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
) => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query.psp34ContractAddress(
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // @ts-ignore
            return output.toHuman()?.Ok;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const duration = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
) => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query["genericPoolContractTrait::duration"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // console.log(output.toHuman());
            // @ts-ignore
            const a = output.toHuman()?.Ok.replace(/\,/g, "");
            return a / 1000;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const startTime = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
) => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await contract_to_call.query["genericPoolContractTrait::startTime"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // console.log(output.toHuman());
            // @ts-ignore
            const a = output.toHuman()?.Ok.replace(/\,/g, "");
            return a / 1;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const owner = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
) => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const value = 0;

    const {result, output} = await contract_to_call.query["ownable::owner"](caller_account, {
        value: value,
        gasLimit: gasLimit,
    });
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

// psp22_contract_calls
const balanceOf = async (
    api: ApiPromise,
    caller_account: string,
    account: string,
    psp22_contract_calls: ContractPromise
) => {
    if (!psp22_contract_calls) {
        console.log("invalid", psp22_contract_calls);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;

    try {
        const {result, output} = await psp22_contract_calls.query["psp22::balanceOf"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit},
            account
        );
        if (result.isOk && output) {
            // console.log(output.toHuman());
            // @ts-ignore
            const a = output.toHuman()?.Ok.replace(/\,/g, "");
            return a / 10 ** 12;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}
const totalSupply = async (
    api: ApiPromise,
    caller_account: string,
    psp22_contract_calls: ContractPromise
) => {
    if (!psp22_contract_calls) {
        console.log("invalid", psp22_contract_calls);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const {result, output} = await psp22_contract_calls.query["psp22::totalSupply"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // console.log(output.toHuman());
            // @ts-ignore
            const a = output.toHuman()?.Ok.replace(/\,/g, "");
            return a / 10 ** 12;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const tokenName = async (
    api: ApiPromise,
    caller_account: string,
    psp22_contract_calls: ContractPromise
) => {
    if (!psp22_contract_calls) {
        console.log("invalid", psp22_contract_calls);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;

    try {
        const {result, output} = await psp22_contract_calls.query["psp22Metadata::tokenName"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // @ts-ignore
            return output.toHuman()?.Ok;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const tokenSymbol = async (
    api: ApiPromise,
    caller_account: string,
    psp22_contract_calls: ContractPromise
) => {
    if (!psp22_contract_calls) {
        console.log("invalid", psp22_contract_calls);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;

    try {
        const {result, output} = await psp22_contract_calls.query["psp22Metadata::tokenSymbol"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // @ts-ignore
            return output.toHuman()?.Ok;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const tokenDecimals = async (
    api: ApiPromise,
    caller_account: string,
    psp22_contract_calls: ContractPromise
) => {
    if (!psp22_contract_calls) {
        console.log("invalid", psp22_contract_calls);
        return null;
    }
    if (!caller_account) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }

    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;

    try {
        const {result, output} = await psp22_contract_calls.query["psp22Metadata::tokenDecimals"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // @ts-ignore
            return output.toHuman()?.Ok;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
    return null;
}