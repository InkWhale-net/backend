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
import {lp_pool_contract} from "../contracts/lp_pool";
import {psp22_contract} from "../contracts/psp22";
import * as dotenv from 'dotenv';
dotenv.config();

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
    pool_contract_calls: ContractPromise,
    updateQueueSchemaRepository: UpdateQueueSchemaRepository,
    nftPoolsSchemaRepository: NftPoolsSchemaRepository,
    tokensSchemaRepository: TokensSchemaRepository,
    poolsSchemaRepository: PoolsSchemaRepository,
    lpPoolsSchemaRepository: LpPoolsSchemaRepository
): Promise<void> => {
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
                    await checkNewPools(api, pool_generator_calls, pool_contract_calls, poolsSchemaRepository);
                else if (requestType == "token")
                    await checkNewTokens(api, tokensSchemaRepository, token_generator_calls);
            } else {
                if (requestType == "nft")
                    await ProcessNFT(poolContract, api, nft_pool_contract_calls, nftPoolsSchemaRepository);
                else if (requestType == "lp")
                    await ProcessLP(poolContract, api, lp_pool_contract_calls, lpPoolsSchemaRepository);
                else if (requestType == "pool")
                    await ProcessPool(poolContract, api, pool_contract_calls, poolsSchemaRepository);
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
): Promise<void> => {
    let _multiplier = await multiplier(api, nft_pool_contract_calls, '');
    let _rewardPool = await rewardPool(api, nft_pool_contract_calls, '');
    let _totalStaked = await totalStaked(api, nft_pool_contract_calls, '', true);
    let _startTime = await startTime(api, nft_pool_contract_calls, '');
    let _duration = await duration(api, nft_pool_contract_calls, '');
    let _tokenContract = await psp22ContractAddress(api, nft_pool_contract_calls, '');
    let _NFTtokenContract = await psp34ContractAddress(api, nft_pool_contract_calls, '');
    let _owner = await owner(api, nft_pool_contract_calls, '');
    if (!_tokenContract || !_NFTtokenContract) {
        console.log(`WARNING: Can not get _tokenContract: ${_tokenContract} or _NFTtokenContract: ${_NFTtokenContract}`);
        return;
    }
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
    pool_contract_calls: ContractPromise,
    poolsSchemaRepository : PoolsSchemaRepository,
): Promise<void> => {
    let _apy = await apy(api, pool_contract_calls, '');
    let _rewardPool = await rewardPool(api, pool_contract_calls, '');
    let _totalStaked = await totalStaked(api, pool_contract_calls, '', false);
    let _startTime = await startTime(api, pool_contract_calls, '');
    let _duration = await duration(api, pool_contract_calls, '');
    let _tokenContract = await psp22ContractAddress(api, pool_contract_calls, '');
    let _owner = await owner(api, pool_contract_calls, '');
    if (!_tokenContract) {
        console.log(`WARNING: Can not get _tokenContract: ${_tokenContract}`);
        return;
    }
    let psp22_contract_calls = new ContractPromise(
        api,
        psp22_contract.CONTRACT_ABI,
        _tokenContract,
    );
    let _tokenName = await tokenName(api, '', psp22_contract_calls);
    let _tokenSymbol = await tokenSymbol(api, '', psp22_contract_calls);
    let _tokenDecimal = await tokenDecimals(api, '', psp22_contract_calls);
    let _tokenTotalSupply = await totalSupply(api, '', psp22_contract_calls);
    try {
        let collection = await poolsSchemaRepository.findOne({
            where: {
                poolContract: poolContract
            }
        });
        if (collection) {
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
            console.log({create_collection: create_collection});
        }
    } catch (e){
        console.log(e);
        return;
    }
}
const ProcessLP = async (
    poolContract: string,
    api: ApiPromise,
    lp_pool_contract_calls: ContractPromise,
    lpPoolsSchemaRepository : LpPoolsSchemaRepository,
): Promise<void> => {
    lp_pool_contract_calls = new ContractPromise(
        api,
        lp_pool_contract.CONTRACT_ABI,
        poolContract,
    );
    let _multiplier = await multiplier(api, lp_pool_contract_calls, '');
    let _rewardPool = await rewardPool(api, lp_pool_contract_calls, '');
    let _totalStaked = await totalStaked(api, lp_pool_contract_calls, '', false);
    let _startTime = await startTime(api, lp_pool_contract_calls, '');
    let _duration = await duration(api, lp_pool_contract_calls, '');
    let _tokenContract = await psp22ContractAddress(api, lp_pool_contract_calls, '');
    let _lptokenContract = await lpContractAddress(api, lp_pool_contract_calls, '');
    let _owner = await owner(api, lp_pool_contract_calls, '');
    if (!_tokenContract || !_lptokenContract) {
        console.log(`WARNING: Can not get _tokenContract: ${_tokenContract} or _lptokenContract: ${_lptokenContract}`);
        return;
    }
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
    let collection = await lpPoolsSchemaRepository.findOne({
        where: {
            poolContract: poolContract
        }
    });
    if (collection) {
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
        console.log({create_collection: create_collection});
    }
}
const ProcessTokens = async (
    api: ApiPromise,
    token_generator_calls: ContractPromise,
    index: number,
    tokensSchemaRepository : TokensSchemaRepository,
): Promise<void> => {
    try {
        let tokenInfo = await getTokenInfo(
            api,
            token_generator_calls,
            '',
            index
        );
        if (!tokenInfo) {
            console.log(`ERROR: Can not get tokenInfo of ${index}`);
            return;
        }
        if (tokenInfo.hasOwnProperty('totalSupply')) {
            if (!tokenInfo.totalSupply) {
                tokenInfo.totalSupply = 0;
            } else {
                tokenInfo.totalSupply = tokenInfo.totalSupply.replace(/,/g, "") / (10 ** parseInt(tokenInfo.decimal));
            }
        }
        tokenInfo.index = index;
        let token = await tokensSchemaRepository.findOne({
            where: {
                contractAddress: tokenInfo.contractAddress
            }
        });

        if (token) {
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
            await tokensSchemaRepository.create(tokenInfo);
        }
    } catch (e) {
        console.log(`ERROR: ProcessTokens - ${e.message}`);
    }
}

const checkNewNFTPools = async (
    api: ApiPromise,
    nft_pool_generator_calls: ContractPromise,
    nft_pool_contract_calls: ContractPromise,
    nftPoolsSchemaRepository: NftPoolsSchemaRepository
): Promise<void> => {
    if (is_running_nft) {
        console.log("checkNewNFTPools is running. Do nothing.");
        return;
    }
    try {
        is_running_nft = true;
        let poolCount = await getPoolCount(api, nft_pool_generator_calls, '');
        for (let index = poolCount; index > 0; index--) {
            let poolContract = await getPool(
                api,
                nft_pool_generator_calls,
                '',
                index
            );
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
    pool_contract_calls: ContractPromise,
    poolsSchemaRepository: PoolsSchemaRepository
): Promise<void> => {
    if (is_running) {
        console.log("checkNewPools is running. Do nothing.");
        return;
    }
    try {
        is_running = true;
        let poolCount = await getPoolCount(api, pool_generator_calls, '');
        for (let index = poolCount; index > 0; index--) {
            let poolContract = await getPool(
                api,
                pool_generator_calls,
                '',
                index
            );
            console.log('poolContract', poolContract);
            if (!poolContract) continue;
            await ProcessPool(poolContract, api, pool_contract_calls, poolsSchemaRepository);
        }
        is_running = false;
    } catch (e) {
        is_running = false;
        console.log(`ERROR: checkNewPools - ${e.message}`);
    }
}

const checkNewLPPools = async (
    api: ApiPromise,
    lp_pool_generator_calls: ContractPromise,
    lp_pool_contract_calls: ContractPromise,
    lpPoolsSchemaRepository: LpPoolsSchemaRepository
): Promise<void> => {
    if (is_running_lp) {
        console.log("checkNewLPPools is running. Do nothing.");
        return;
    }
    try {
        is_running_lp = true;
        let poolCount = await getPoolCount(api, lp_pool_generator_calls, '');
        console.log('LP poolCount', poolCount);
        for (let index = poolCount; index > 0; index--) {
            let poolContract = await getPool(
                api,
                lp_pool_generator_calls,
                '',
                index
            );
            if (!poolContract) continue;
            await ProcessLP(poolContract, api, lp_pool_contract_calls, lpPoolsSchemaRepository);
        }
        is_running_lp = false;
    } catch (e) {
        is_running_lp = false;
        console.log(`ERROR: checkNewLPPools - ${e.message}`);
    }
}

const checkNewTokens = async (
    api: ApiPromise,
    tokensSchemaRepository : TokensSchemaRepository,
    token_generator_calls: ContractPromise
): Promise<void> => {
    if (is_running_tokens) {
        console.log("checkNewTokens is running. Do nothing.");
        return;
    }
    try {
        is_running_tokens = true;
        let tokenCount = await getTokenCount(api, token_generator_calls, '');
        for (let index = tokenCount; index > 0; index--) {
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
        console.log(`ERROR: checkNewTokens - ${e.message}`);
    }
    is_running_tokens = false;
}

export const checkAll = async (
    api: ApiPromise,
    pool_generator_calls: ContractPromise,
    pool_contract_calls: ContractPromise,
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
    await checkNewPools(api, pool_generator_calls, pool_contract_calls, poolsSchemaRepository);
    await checkNewNFTPools(api, nft_pool_generator_calls, nft_pool_contract_calls, nftPoolsSchemaRepository);
    await checkNewLPPools(api, lp_pool_generator_calls, lp_pool_contract_calls, lpPoolsSchemaRepository);
    await checkNewTokens(api, tokensSchemaRepository, token_generator_calls);
}

const getTokenInfo = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string,
    index: number
): Promise<any | undefined> => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return undefined;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            const getTokenInfo = output.toHuman()?.Ok;
            console.log({getTokenInfo: getTokenInfo});
            return getTokenInfo;
        }
    } catch (e) {
        console.log(`ERROR: getTokenInfo - ${e.message}`);
        return undefined;
    }
    return undefined;
}

const getTokenCount = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
): Promise<number> => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return 0;
    }
    if (!caller_account || caller_account?.length == 0) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }
    const gasLimit = readOnlyGasLimit(api);
    const azeroValue = 0;
    try {
        const {result, output} = await contract_to_call.query["tokenManagerTrait::getTokenCount"](
            caller_account,
            {value: azeroValue, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // @ts-ignore
            const getTokenCount = parseFloat(output.toHuman()?.Ok.replace(/,/g, ""));
            console.log({getTokenCount: getTokenCount});
            return getTokenCount;
        }
    } catch (e) {
        console.log(`ERROR: getTokenCount - ${e.message}`);
        return 0;
    }
    return 0;
}

const getPoolCount = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
): Promise<number> => {
    if (!contract_to_call) {
        console.log('invalid', contract_to_call);
        return 0;
    }
    if (!caller_account || caller_account?.length == 0) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }
    const gasLimit = readOnlyGasLimit(api);
    const azeroValue = 0;
    try {
        const {result, output} = await contract_to_call.query["genericPoolGeneratorTrait::getPoolCount"](
            caller_account,
            {value: azeroValue, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // @ts-ignore
            const getPoolCount = parseFloat(output.toHuman()?.Ok.replace(/,/g, ''));
            console.log({getPoolCount: getPoolCount});
            return getPoolCount;
        }
    } catch (e) {
        console.log(`ERROR: getPoolCount - ${e.message}`);
        return 0;
    }
    return 0;
}
const getPool = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string,
    index: number
): Promise<string | undefined> => {
    if (!contract_to_call) {
        console.log('invalid', contract_to_call);
        return undefined;
    }
    if (!caller_account || caller_account?.length == 0) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }
    const gasLimit = readOnlyGasLimit(api);
    const azeroValue = 0;
    try {
        const {result, output} = await contract_to_call.query["genericPoolGeneratorTrait::getPool"](
            caller_account,
            {value: azeroValue, gasLimit: gasLimit},
            index
        );
        if (result.isOk && output) {
            // @ts-ignore
            const getPool = output.toHuman()?.Ok;
            console.log({getPool: getPool});
            return getPool;
        }
    } catch (e) {
        console.log(`ERROR: getPool - ${e.message}`);
        return undefined;
    }
    return undefined;
}

const apy = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
): Promise<number> => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return 0;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            // @ts-ignore
            const apy = parseFloat(output.toHuman()?.Ok.replace(/,/g, ""));
            console.log({apy: apy});
            return apy;
        }
    } catch (e) {
        console.log(`ERROR: apy - ${e.message}`);
        return 0;
    }
    return 0;
}
const multiplier = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
): Promise<number> => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return 0;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            // @ts-ignore
            const multiplier = parseFloat(output.toHuman()?.Ok.replace(/,/g, ""));
            console.log({multiplier: multiplier});
            return multiplier;
        }
    } catch (e) {
        console.log(`ERROR: multiplier - ${e.message}`);
        return 0;
    }
    return 0;
}

const rewardPool = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
): Promise<number> => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return 0;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            // @ts-ignore
            const rewardPool = parseFloat(output.toHuman()?.Ok.replace(/,/g, "")) / (10 ** 12);
            console.log({rewardPool: rewardPool});
            return rewardPool;
        }
    } catch (e) {
        console.log(`ERROR: rewardPool - ${e.message}`);
        return 0;
    }
    return 0;
}

const totalStaked = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string,
    is_nft: boolean
): Promise<number> => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return 0;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            // @ts-ignore
            const a = parseFloat(output.toHuman()?.Ok.replace(/,/g, ""));
            let totalStaked: number;
            if (is_nft) {
                totalStaked = a;
            } else {
                totalStaked = a / (10 ** 12);
            }
            return totalStaked;
        }
    } catch (e) {
        console.log(`ERROR: totalStaked - ${e.message}`);
        return 0;
    }
    return 0;
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
    if (!caller_account || caller_account?.length == 0) {
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
            // @ts-ignore
            return output.toHuman()?.Ok;
        }
    } catch (e) {
        console.log(`ERROR: getStakeInfo - ${e.message}`);
        return null;
    }
    return null;
}

const psp22ContractAddress = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
): Promise<string | undefined> => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return undefined;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            const psp22ContractAddress = output.toHuman()?.Ok;
            console.log({psp22ContractAddress: psp22ContractAddress});
            return psp22ContractAddress;
        }
    } catch (e) {
        console.log(`ERROR: psp22ContractAddress - ${e.message}`);
        return undefined;
    }
    return undefined;
}

const lpContractAddress = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
):Promise<string | undefined> => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return undefined;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            const lpContractAddress = output.toHuman()?.Ok;
            console.log({lpContractAddress: lpContractAddress});
            return lpContractAddress;
        }
    } catch (e) {
        console.log(`ERROR: lpContractAddress - ${e.message}`);
        return undefined;
    }
    return undefined;
}

const psp34ContractAddress = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
):Promise<string | undefined> => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return undefined;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            const psp34ContractAddress = output.toHuman()?.Ok;
            console.log({psp34ContractAddress: psp34ContractAddress});
            return psp34ContractAddress;
        }
    } catch (e) {
        console.log(`ERROR: psp34ContractAddress - ${e.message}`);
        return undefined;
    }
    return undefined;
}

const duration = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
): Promise<number> => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return 0;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            // @ts-ignore
            const duration = parseFloat(output.toHuman()?.Ok.replace(/,/g, "")) / 1000;
            console.log({duration: duration});
            return duration;
        }
    } catch (e) {
        console.log(`ERROR: duration - ${e.message}`);
        return 0;
    }
    return 0;
}

const startTime = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
): Promise<number> => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return 0;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            // @ts-ignore
            const startTime = parseInt(output.toHuman()?.Ok.replace(/,/g, ""));
            console.log({startTime: startTime});
            return startTime;
        }
    } catch (e) {
        console.log(`ERROR: startTime - ${e.message}`);
        return 0;
    }
    return 0;
}

const owner = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
): Promise<string | undefined> => {
    if (!contract_to_call) {
        console.log("invalid", contract_to_call);
        return undefined;
    }
    if (!caller_account || caller_account?.length == 0) {
        caller_account = `${process.env.CALLER_ACCOUNT}`;
    }
    const gasLimit = readOnlyGasLimit(api);
    const value = 0;
    const {result, output} = await contract_to_call
        .query["ownable::owner"](
            caller_account,
        {
            value: value,
            gasLimit: gasLimit,
        });
    if (result.isOk && output) {
        // @ts-ignore
        const owner = output.toHuman()?.Ok;
        console.log({owner: owner});
        return owner;
    }
    return undefined;
}

const balanceOf = async (
    api: ApiPromise,
    caller_account: string,
    account: string,
    psp22_contract_calls: ContractPromise
): Promise<number> => {
    if (!psp22_contract_calls) {
        console.log("invalid", psp22_contract_calls);
        return 0;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            // @ts-ignore
            const balanceOf = parseFloat(output.toHuman()?.Ok.replace(/,/g, "")) / (10 ** 12);
            console.log({balanceOf: balanceOf});
            return balanceOf;
        }
    } catch (e) {
        console.log(`ERROR: balanceOf - ${e.message}`);
        return 0;
    }
    return 0;
}
const totalSupply = async (
    api: ApiPromise,
    caller_account: string,
    psp22_contract_calls: ContractPromise
): Promise<number> => {
    if (!psp22_contract_calls) {
        console.log("invalid", psp22_contract_calls);
        return 0;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            // @ts-ignore
            const totalSupply = parseFloat(output.toHuman()?.Ok.replace(/,/g, "")) / ( 10 ** 12);
            console.log({totalSupply: totalSupply});
            return totalSupply;
        }
    } catch (e) {
        console.log(`ERROR: totalSupply - ${e.message}`);
        return 0;
    }
    return 0;
}

const tokenName = async (
    api: ApiPromise,
    caller_account: string,
    psp22_contract_calls: ContractPromise
): Promise<string | undefined> => {
    if (!psp22_contract_calls) {
        console.log("invalid", psp22_contract_calls);
        return undefined;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            const tokenName = output.toHuman()?.Ok;
            console.log({tokenName: tokenName});
            return tokenName;
        }
    } catch (e) {
        console.log(`ERROR: tokenName - ${e.message}`);
        return undefined;
    }
    return undefined;
}

const tokenSymbol = async (
    api: ApiPromise,
    caller_account: string,
    psp22_contract_calls: ContractPromise
): Promise<string | undefined> => {
    if (!psp22_contract_calls) {
        console.log("invalid", psp22_contract_calls);
        return undefined;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            const tokenSymbol = output.toHuman()?.Ok;
            console.log({tokenSymbol: tokenSymbol});
            return tokenSymbol;
        }
    } catch (e) {
        console.log(`ERROR: tokenSymbol - ${e.message}`);
        return undefined;
    }
    return undefined;
}

const tokenDecimals = async (
    api: ApiPromise,
    caller_account: string,
    psp22_contract_calls: ContractPromise
): Promise<number> => {
    if (!psp22_contract_calls) {
        console.log("invalid", psp22_contract_calls);
        return 0;
    }
    if (!caller_account || caller_account?.length == 0) {
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
            const decimal = output.toHuman()?.Ok;
            console.log({decimal: decimal});
            return decimal;
        }
    } catch (e) {
        console.log(`ERROR: tokenDecimals - ${e.message}`);
        return 0;
    }
    return 0;
}