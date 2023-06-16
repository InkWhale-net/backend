import {ContractPromise} from "@polkadot/api-contract";
import {ApiPromise} from "@polkadot/api";
import {
    LpPoolsSchemaRepository,
    NftPoolsSchemaRepository,
    PoolsSchemaRepository,
    TokensSchemaRepository,
    UpdateQueueSchemaRepository
} from "../repositories";
import {isInwWhaleDisabledCollections, readOnlyGasLimit} from "./utils";
import {lp_pool_contract} from "../contracts/lp_pool";
import {psp22_contract} from "../contracts/psp22";
import dotenv from "dotenv";
import {nft_pool_contract} from "../contracts/nft_pool";
import {pool_contract} from "../contracts/pool";
import {token_generator_contract} from "../contracts/token_generator";
import {pool_generator_contract} from "../contracts/pool_generator";
import {lp_pool_generator_contract} from "../contracts/lp_pool_generator";
import {nft_pool_generator_contract} from "../contracts/nft_pool_generator";
import {convertToUTCTime, sleep} from "./Tools";
import {global_vars} from "../cronjob/global";
dotenv.config();

export const checkQueue = async (
    isTrigger: boolean,
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
): Promise<boolean> => {
    console.log(`Start checkQueue at ${convertToUTCTime(new Date())}`);
    if (!isTrigger) {
        if (global_vars.is_check_queue) {
            console.log(`Stop checkQueue at ${convertToUTCTime(new Date())} with is_check_queue: ${global_vars.is_check_queue}`);
            return false;
        }
        global_vars.is_check_queue = true;
    }
    try {
        let queue_data = await updateQueueSchemaRepository.find({});
        let records_length = queue_data.length;
        for (let j = 0; j < records_length; j++) {
            let poolContract: string = queue_data[j].poolContract!;
            let requestType = queue_data[j].requestType;
            console.log("processing queue for ", requestType, poolContract);
            let isRemoved = false;
            if (poolContract == "new") {
                if (requestType == "nft") {
                    console.log(`Start checkNewNFTPools at ${convertToUTCTime(new Date())}`);
                    isRemoved = await checkNewNFTPools(isTrigger, false, api, nft_pool_generator_calls, nft_pool_contract_calls, nftPoolsSchemaRepository);
                    console.log(`Stop checkNewNFTPools at ${convertToUTCTime(new Date())}`);
                } else if (requestType == "lp") {
                    console.log(`Start checkNewLPPools at ${convertToUTCTime(new Date())}`);
                    isRemoved = await checkNewLPPools(isTrigger, false, api, lp_pool_generator_calls, lp_pool_contract_calls, lpPoolsSchemaRepository);
                    console.log(`Stop checkNewLPPools at ${convertToUTCTime(new Date())}`);
                } else if (requestType == "pool") {
                    console.log(`Start checkNewPools at ${convertToUTCTime(new Date())}`);
                    isRemoved = await checkNewPools(isTrigger, false, api, pool_generator_calls, pool_contract_calls, poolsSchemaRepository);
                    console.log(`Stop checkNewPools at ${convertToUTCTime(new Date())}`);
                } else if (requestType == "token") {
                    console.log(`Start checkNewTokens at ${convertToUTCTime(new Date())}`);
                    isRemoved = await checkNewTokens(isTrigger, false, api, tokensSchemaRepository, token_generator_calls);
                    console.log(`Stop checkNewTokens at ${convertToUTCTime(new Date())}`);
                }
            } else {
                if (requestType == "nft") {
                    console.log(`Start ProcessNFT at ${convertToUTCTime(new Date())}`);
                    isRemoved = await ProcessNFT(isTrigger, false, poolContract, api, nft_pool_contract_calls, nftPoolsSchemaRepository);
                    console.log(`Stop ProcessNFT at ${convertToUTCTime(new Date())}`);
                } else if (requestType == "lp") {
                    console.log(`Start ProcessLP at ${convertToUTCTime(new Date())}`);
                    isRemoved = await ProcessLP(isTrigger, false, poolContract, api, lp_pool_contract_calls, lpPoolsSchemaRepository);
                    console.log(`Stop ProcessLP at ${convertToUTCTime(new Date())}`);
                } else if (requestType == "pool") {
                    console.log(`Start ProcessPool at ${convertToUTCTime(new Date())}`);
                    isRemoved = await ProcessPool(isTrigger, false, poolContract, api, pool_contract_calls, poolsSchemaRepository);
                    console.log(`Stop ProcessPool at ${convertToUTCTime(new Date())}`);
                }
            }
            if (isRemoved) {
                try {
                    await updateQueueSchemaRepository.deleteAll({
                        poolContract: poolContract
                    });
                } catch (e) {
                    console.log(`ERROR: checkQueue deleteAll - ${e.message}`);
                }
            }
        }
        if (!isTrigger) {
            global_vars.is_check_queue = false;
        }
    } catch (e) {
        console.log(`ERROR: checkQueue - ${e.message}`);
        if (!isTrigger) {
            global_vars.is_check_queue = false;
        }
        console.log(`Stop checkQueue at ${convertToUTCTime(new Date())} with an exception`);
        return false;
    }
    console.log(`Stop checkQueue at ${convertToUTCTime(new Date())} in normal mode`);
    return true;
}
const ProcessNFT = async (
    isTrigger: boolean,
    isCheckAll: boolean,
    poolContract: string,
    api: ApiPromise,
    nft_pool_contract_calls: ContractPromise,
    nftPoolsSchemaRepository: NftPoolsSchemaRepository
): Promise<boolean> => {
    try {
        nft_pool_contract_calls = new ContractPromise(
            api,
            nft_pool_contract.CONTRACT_ABI,
            poolContract,
        );
        let _multiplier = await multiplier(api, nft_pool_contract_calls, '');
        let _rewardPool = await rewardPool(api, nft_pool_contract_calls, '');
        let _totalStaked = await totalStaked(api, nft_pool_contract_calls, '', true);
        let _maxStaking = await maxStakingAmount(api, nft_pool_contract_calls,'', `nft_pool_contract`, true);
        let _startTime = await startTime(api, nft_pool_contract_calls, '');
        let _duration = await duration(api, nft_pool_contract_calls, '');
        let _tokenContract = await psp22ContractAddress(api, nft_pool_contract_calls, '');
        let _NFTtokenContract = await psp34ContractAddress(api, nft_pool_contract_calls, '');
        let _owner = await owner(api, nft_pool_contract_calls, '');
        if (!_tokenContract || !_NFTtokenContract) {
            console.log(`WARNING: Can not get _tokenContract: ${_tokenContract} or _NFTtokenContract: ${_NFTtokenContract}`);
            return false;
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
            try {
                await nftPoolsSchemaRepository.updateById(collection._id, {
                    poolContract: poolContract,
                    NFTtokenContract: _NFTtokenContract,
                    tokenContract: _tokenContract,
                    tokenName: _tokenName,
                    tokenSymbol: _tokenSymbol,
                    tokenDecimal: _tokenDecimal,
                    duration: _duration ? _duration : 0,
                    startTime: _startTime ? _startTime : 0,
                    tokenTotalSupply: _tokenTotalSupply ? (_tokenTotalSupply / (10 ** _tokenDecimal)) : 0,
                    rewardPool: _rewardPool ? (_rewardPool / (10 ** _tokenDecimal)) : 0,
                    totalStaked: _totalStaked ? _totalStaked : 0,
                    maxStakingAmount: _maxStaking ? _maxStaking : 0,
                    multiplier: _multiplier,
                    owner: _owner,
                    nftPoolGeneratorContractAddress: nft_pool_generator_contract.CONTRACT_ADDRESS
                });
            } catch (e) {
                console.log(`ERROR: ProcessNFT updateById - ${e.message}`);
                return false;
            }
        } else {
            try {
                await nftPoolsSchemaRepository.create({
                    poolContract: poolContract,
                    NFTtokenContract: _NFTtokenContract,
                    tokenContract: _tokenContract,
                    tokenName: _tokenName,
                    tokenSymbol: _tokenSymbol,
                    tokenDecimal: _tokenDecimal,
                    duration: _duration ? _duration : 0,
                    startTime: _startTime ? _startTime : 0,
                    tokenTotalSupply: _tokenTotalSupply ? (_tokenTotalSupply / (10 ** _tokenDecimal)) : 0,
                    rewardPool: _rewardPool ? (_rewardPool / (10 ** _tokenDecimal)) : 0,
                    totalStaked: _totalStaked ? _totalStaked : 0,
                    maxStakingAmount: _maxStaking ? _maxStaking : 0,
                    multiplier: _multiplier,
                    owner: _owner,
                    nftPoolGeneratorContractAddress: nft_pool_generator_contract.CONTRACT_ADDRESS
                });
            } catch (e) {
                console.log(`ERROR: ProcessNFT create - ${e.message}`);
                return false;
            }
        }
    } catch (e) {
        console.log(`ERROR: ProcessNFT - ${e.message}`);
        return false;
    }
    return true;
}
const ProcessPool = async (
    isTrigger: boolean,
    isCheckAll: boolean,
    poolContractAddress: string,
    api: ApiPromise,
    pool_contract_calls: ContractPromise,
    poolsSchemaRepository : PoolsSchemaRepository,
): Promise<boolean> => {
    try {
        pool_contract_calls = new ContractPromise(
            api,
            pool_contract.CONTRACT_ABI,
            poolContractAddress,
        );
        let _apy = await apy(api, pool_contract_calls, '');
        if(!(_apy > 0)) return false
        let _rewardPool = await rewardPool(api, pool_contract_calls, '');
        let _totalStaked = await totalStaked(api, pool_contract_calls, '', false);
        let _maxStaking = await maxStakingAmount(api, pool_contract_calls,'', `pool_contract`, false);
        let _startTime = await startTime(api, pool_contract_calls, '');
        let _duration = await duration(api, pool_contract_calls, '');
        let _tokenContract = await psp22ContractAddress(api, pool_contract_calls, '');
        let _owner = await owner(api, pool_contract_calls, '');
        if (!_tokenContract) {
            console.log(`WARNING: Can not get _tokenContract: ${_tokenContract}`);
            return false;
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
                    poolContract: poolContractAddress
                }
            });
            if (collection) {
                try {
                    await poolsSchemaRepository.updateById(collection._id, {
                        tokenContract: _tokenContract,
                        tokenName: _tokenName,
                        tokenSymbol: _tokenSymbol,
                        tokenDecimal: _tokenDecimal,
                        duration: _duration ? _duration : 0,
                        startTime: _startTime ? _startTime : 0,
                        tokenTotalSupply: _tokenTotalSupply ? (_tokenTotalSupply / (10 ** _tokenDecimal)) : 0,
                        rewardPool: _rewardPool ? (_rewardPool / (10 ** _tokenDecimal)) : 0,
                        totalStaked: _totalStaked ? _totalStaked : 0,
                        maxStakingAmount: _maxStaking ? _maxStaking : 0,
                        apy: _apy,
                        owner: _owner,
                        poolGeneratorContractAddress: pool_generator_contract.CONTRACT_ADDRESS
                    });
                } catch (e) {
                    console.log(`ERROR: ProcessPool updateById - ${e.message}`);
                    return false;
                }
            } else {
                try {
                    let create_collection = await poolsSchemaRepository.create(
                        {
                            poolContract: poolContractAddress,
                            tokenContract: _tokenContract,
                            tokenName: _tokenName,
                            tokenSymbol: _tokenSymbol,
                            tokenDecimal: _tokenDecimal,
                            duration: _duration ? _duration : 0,
                            startTime: _startTime ? _startTime : 0,
                            tokenTotalSupply: _tokenTotalSupply ? (_tokenTotalSupply / (10 ** _tokenDecimal)) : 0,
                            rewardPool: _rewardPool ? (_rewardPool / (10 ** _tokenDecimal)) : 0,
                            totalStaked: _totalStaked ? _totalStaked : 0,
                            maxStakingAmount: _maxStaking ? _maxStaking : 0,
                            apy: _apy,
                            owner: _owner,
                            poolGeneratorContractAddress: pool_generator_contract.CONTRACT_ADDRESS
                        }
                    );
                    console.log({create_collection: create_collection});
                } catch (e) {
                    console.log(`ERROR: ProcessPool create - ${e.message}`);
                    return false;
                }
            }
        } catch (e){
            console.log(`ERROR: ProcessPool - ${e.message}`);
            return false;
        }
    } catch (e) {
        console.log(`ERROR: ProcessPool - ${e.message}`);
        return false;
    }
    return true;
}
const ProcessLP = async (
    isTrigger: boolean,
    isCheckAll: boolean,
    poolContract: string,
    api: ApiPromise,
    lp_pool_contract_calls: ContractPromise,
    lpPoolsSchemaRepository : LpPoolsSchemaRepository,
): Promise<boolean> => {
    try {
        lp_pool_contract_calls = new ContractPromise(
            api,
            lp_pool_contract.CONTRACT_ABI,
            poolContract,
        );
        let _multiplier = await multiplier(api, lp_pool_contract_calls, '');
        let _rewardPool = await rewardPool(api, lp_pool_contract_calls, '');
        let _totalStaked = await totalStaked(api, lp_pool_contract_calls, '', false);
        let _maxStaking = await maxStakingAmount(api, lp_pool_contract_calls,'', `lp_pool_contract`, false);
        let _startTime = await startTime(api, lp_pool_contract_calls, '');
        let _duration = await duration(api, lp_pool_contract_calls, '');
        let _tokenContract = await psp22ContractAddress(api, lp_pool_contract_calls, '');
        let _lptokenContract = await lpContractAddress(api, lp_pool_contract_calls, '');
        let _owner = await owner(api, lp_pool_contract_calls, '');
        if (!_tokenContract || !_lptokenContract) {
            console.log(`WARNING: Can not get _tokenContract: ${_tokenContract} or _lptokenContract: ${_lptokenContract}`);
            return false;
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
            try {
                await lpPoolsSchemaRepository.updateById(collection._id, {
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
                    tokenTotalSupply: _tokenTotalSupply ? (_tokenTotalSupply / (10 ** _tokenDecimal)) : 0,
                    lptokenTotalSupply: _lptokenTotalSupply ? (_lptokenTotalSupply / (10 ** _lptokenDecimal)) : 0,
                    rewardPool: _rewardPool ? (_rewardPool / (10 ** _tokenDecimal)) : 0,
                    totalStaked: _totalStaked ? _totalStaked : 0,
                    maxStakingAmount: _maxStaking ? _maxStaking : 0,
                    multiplier: _multiplier,
                    owner: _owner,
                    lpPoolGeneratorContractAddress: lp_pool_generator_contract.CONTRACT_ADDRESS
                });
            } catch (e) {
                console.log(`ERROR: ProcessLP updateById - ${e.message}`);
                return false;
            }
        } else {
            try {
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
                        tokenTotalSupply: _tokenTotalSupply ? (_tokenTotalSupply / (10 ** _tokenDecimal)) : 0,
                        lptokenTotalSupply: _lptokenTotalSupply ? (_lptokenTotalSupply / (10 ** _lptokenDecimal)) : 0,
                        rewardPool: _rewardPool ? (_rewardPool / (10 ** _tokenDecimal)) : 0,
                        totalStaked: _totalStaked ? _totalStaked : 0,
                        maxStakingAmount: _maxStaking ? _maxStaking : 0,
                        multiplier: _multiplier,
                        owner: _owner,
                        lpPoolGeneratorContractAddress: lp_pool_generator_contract.CONTRACT_ADDRESS
                    }
                );
                console.log({create_collection: create_collection});
            } catch (e) {
                console.log(`ERROR: ProcessLP updateById - ${e.message}`);
                return false;
            }
        }
    } catch (e) {
        console.log(`ERROR: ProcessLP - ${e.message}`);
        return false;
    }
    return true;
}
const ProcessTokens = async (
    api: ApiPromise,
    token_generator_calls: ContractPromise,
    index: number,
    tokensSchemaRepository : TokensSchemaRepository,
): Promise<void> => {
    try {
        let contractAddress = await getTokenInfo(
            api,
            token_generator_calls,
            '',
            index
        );
        if (!contractAddress) {
            console.log(`ERROR: Can not get contractAddress of ${index}`);
            return;
        }
        if (contractAddress){
            console.log(`Start get owner info ${contractAddress} for index ${index}`);
            const psp22_contract_calls = new ContractPromise(
                api,
                psp22_contract.CONTRACT_ABI,
                contractAddress,
            );
            let _owner = await owner(api, psp22_contract_calls, '');
            // let _mintTo = await mintTo(api, psp22_contract_calls, '');
            let _tokenName = await tokenName(api, '', psp22_contract_calls);
            let _tokenSymbol = await tokenSymbol(api, '', psp22_contract_calls);
            let _tokenDecimal = await tokenDecimals(api, '', psp22_contract_calls);
            let _tokenTotalSupply = await totalSupply(api, '', psp22_contract_calls);
            console.log(`Stop get owner info ${contractAddress}`);
            const currentToken = await tokensSchemaRepository.findOne({
                where: {
                    contractAddress: contractAddress,
                    tokenGeneratorContractAddress: token_generator_contract.CONTRACT_ADDRESS
                }
            });
            if (currentToken) {
                try {
                    await tokensSchemaRepository.updateById(currentToken._id, {
                        name: _tokenName,
                        symbol: _tokenSymbol,
                        decimal: _tokenDecimal,
                        creator: _owner,
                        mintTo: undefined,
                        totalSupply: _tokenTotalSupply ? (_tokenTotalSupply / (10 ** _tokenDecimal)) : 0,
                        index: index,
                        isManagedByTokenGenerator: true,
                        updatedTime: new Date()
                    });
                } catch (e) {
                    console.log(`ERROR: ProcessTokens updateById - ${e.message}`);
                }
            } else {
                try {
                    await tokensSchemaRepository.create({
                        name: _tokenName,
                        symbol: _tokenSymbol,
                        decimal: _tokenDecimal,
                        creator: _owner,
                        mintTo: undefined,
                        totalSupply: _tokenTotalSupply ? (_tokenTotalSupply / (10 ** _tokenDecimal)) : 0,
                        index: index,
                        contractAddress: contractAddress,
                        tokenGeneratorContractAddress: token_generator_contract.CONTRACT_ADDRESS,
                        isManagedByTokenGenerator: true,
                        createdTime: new Date(),
                        updatedTime: new Date()
                    });
                } catch (e) {
                    console.log(`ERROR: ProcessTokens create - ${e.message}`);
                }
            }
        }
    } catch (e) {
        console.log(`ERROR: ProcessTokens - ${e.message}`);
    }
}

const checkNewNFTPools = async (
    isTrigger: boolean,
    isCheckAll: boolean,
    api: ApiPromise,
    nft_pool_generator_calls: ContractPromise,
    nft_pool_contract_calls: ContractPromise,
    nftPoolsSchemaRepository: NftPoolsSchemaRepository
): Promise<boolean> => {
    if (!isTrigger) {
        if (global_vars.is_running_nft) {
            console.log("checkNewNFTPools is running. Do nothing.");
            return false;
        }
        global_vars.is_running_nft = true;
    }
    try {
        let poolCount = await getPoolCount(api, nft_pool_generator_calls, '');
        let totalNftPoolDb = (await nftPoolsSchemaRepository.count({
            nftPoolGeneratorContractAddress: nft_pool_generator_contract.CONTRACT_ADDRESS,
        })).count;
        console.log({
            poolCount: poolCount,
            totalNftPoolDb: totalNftPoolDb
        });
        if (totalNftPoolDb >= poolCount) {
            await sleep(3000);
            poolCount = await getPoolCount(api, nft_pool_generator_calls, '');
        }
        totalNftPoolDb = (isCheckAll) ? 0 : totalNftPoolDb;
        for (let index = poolCount; index > totalNftPoolDb; index--) {
            let poolContract = await getPool(
                api,
                nft_pool_generator_calls,
                '',
                index
            );
            // TODO: skip if poolContract is Punk Collections and remove queue!
            if (isInwWhaleDisabledCollections(poolContract)) {
                continue;
            }
            console.log('checkNewNFTPools - poolContract', poolContract);
            if (!poolContract) continue;
            nft_pool_contract_calls = new ContractPromise(
                api,
                nft_pool_contract.CONTRACT_ABI,
                poolContract,
            );
            await ProcessNFT(isTrigger, isCheckAll, poolContract, api, nft_pool_contract_calls, nftPoolsSchemaRepository);
        }
        if (!isTrigger) {
            global_vars.is_running_nft = false;
        }
    } catch (e) {
        if (!isTrigger) {
            global_vars.is_running_nft = false;
        }
        console.log(e.message);
        return false;
    }
    return true;
}

const checkNewPools = async (
    isTrigger: boolean,
    isCheckAll: boolean,
    api: ApiPromise,
    pool_generator_calls: ContractPromise,
    pool_contract_calls: ContractPromise,
    poolsSchemaRepository: PoolsSchemaRepository
): Promise<boolean> => {
    if (!isTrigger) {
        if (global_vars.is_running) {
            console.log("checkNewPools is running. Do nothing.");
            return false;
        }
        global_vars.is_running = true;
    }
    try {
        let poolCount = await getPoolCount(api, pool_generator_calls, '');
        let totalPoolDb = (await poolsSchemaRepository.count({
            poolGeneratorContractAddress: pool_generator_contract.CONTRACT_ADDRESS
        })).count;
        console.log({
            poolCount: poolCount,
            totalPoolDb: totalPoolDb
        });
        if (totalPoolDb >= poolCount) {
            await sleep(3000);
            poolCount = await getPoolCount(api, pool_generator_calls, '');
        }
        totalPoolDb = (isCheckAll) ? 0 : totalPoolDb;
        for (let index = poolCount; index > totalPoolDb; index--) {
            let poolContract = await getPool(
                api,
                pool_generator_calls,
                '',
                index
            );
            // TODO: skip if poolContract is Punk Collections and remove queue!
            if (isInwWhaleDisabledCollections(poolContract)) {
                continue;
            }
            console.log('checkNewPools - poolContract', poolContract);
            if (!poolContract) continue;
            pool_contract_calls = new ContractPromise(
                api,
                pool_contract.CONTRACT_ABI,
                poolContract,
            );
            await ProcessPool(isTrigger, isCheckAll, poolContract, api, pool_contract_calls, poolsSchemaRepository);
        }
        if (!isTrigger) {
            global_vars.is_running = false;
        }
    } catch (e) {
        if (!isTrigger) {
            global_vars.is_running = false;
        }
        console.log(`ERROR: checkNewPools - ${e.message}`);
        return false;
    }
    return true;
}

const checkNewLPPools = async (
    isTrigger: boolean,
    isCheckAll: boolean,
    api: ApiPromise,
    lp_pool_generator_calls: ContractPromise,
    lp_pool_contract_calls: ContractPromise,
    lpPoolsSchemaRepository: LpPoolsSchemaRepository
): Promise<boolean> => {
    if (!isTrigger) {
        if (global_vars.is_running_lp) {
            console.log("checkNewLPPools is running. Do nothing.");
            return false;
        }
        global_vars.is_running_lp = true;
    }
    try {
        let poolCount = await getPoolCount(api, lp_pool_generator_calls, '');
        console.log('LP poolCount', poolCount);
        let totalLpPoolDb = (await lpPoolsSchemaRepository.count({
            lpPoolGeneratorContractAddress: lp_pool_generator_contract.CONTRACT_ADDRESS,
        })).count;
        console.log({
            poolCount: poolCount,
            totalLpPoolDb: totalLpPoolDb
        });
        if (totalLpPoolDb >= poolCount) {
            await sleep(3000);
            poolCount = await getPoolCount(api, lp_pool_generator_calls, '');
        }
        totalLpPoolDb = (isCheckAll) ? 0 : totalLpPoolDb;
        for (let index = poolCount; index > totalLpPoolDb; index--) {
            let poolContract = await getPool(
                api,
                lp_pool_generator_calls,
                '',
                index
            );
            // TODO: skip if poolContract is Punk Collections and remove queue!
            if (isInwWhaleDisabledCollections(poolContract)) {
                continue;
            }
            console.log('checkNewLPPools - poolContract', poolContract);
            if (!poolContract) continue;
            lp_pool_contract_calls = new ContractPromise(
                api,
                lp_pool_contract.CONTRACT_ABI,
                poolContract,
            );
            await ProcessLP(isTrigger, isCheckAll, poolContract, api, lp_pool_contract_calls, lpPoolsSchemaRepository);
        }
        if (!isTrigger) {
            global_vars.is_running_lp = false;
        }
    } catch (e) {
        if (!isTrigger) {
            global_vars.is_running_lp = false;
        }
        console.log(`ERROR: checkNewLPPools - ${e.message}`);
        return false;
    }
    return true;
}

const checkNewTokens = async (
    isTrigger: boolean,
    isCheckAll: boolean,
    api: ApiPromise,
    tokensSchemaRepository : TokensSchemaRepository,
    token_generator_calls: ContractPromise
): Promise<boolean> => {
    if (!isTrigger) {
        if (global_vars.is_running_tokens) {
            console.log("checkNewTokens is running. Do nothing.");
            return false;
        }
        global_vars.is_running_tokens = true;
    }
    try {
        let tokenCount = await getTokenCount(api, token_generator_calls, '');
        let totalTokenDb = (await tokensSchemaRepository.count({
            tokenGeneratorContractAddress: token_generator_contract.CONTRACT_ADDRESS,
            isManagedByTokenGenerator: true,
            index: {gt: 0}
        })).count;
        console.log({
            tokenCount: tokenCount,
            totalTokenDb: totalTokenDb
        });
        if (totalTokenDb >= tokenCount) {
            await sleep(3000);
            tokenCount = await getTokenCount(api, token_generator_calls, '');
        }
        totalTokenDb = (isCheckAll) ? 0 : totalTokenDb;
        for (let index = tokenCount; index > totalTokenDb; index--) {
            let token = await tokensSchemaRepository.findOne({
                where: {
                    index: index,
                    contractAddress: token_generator_contract.CONTRACT_ADDRESS,
                    isManagedByTokenGenerator: true
                }
            });
            if (!token) {
                await ProcessTokens(api, token_generator_calls, index, tokensSchemaRepository);
            } else {
                console.log(`token_generator_contract: ${token_generator_contract.CONTRACT_ADDRESS} index: ${index} ready in DB`);
            }
        }
    } catch (e) {
        if (!isTrigger) {
            global_vars.is_running_tokens = false;
        }
        console.log(`ERROR: checkNewTokens - ${e.message}`);
        return false;
    }
    if (!isTrigger) {
        global_vars.is_running_tokens = false;
    }
    return true;
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
    console.log(`Start checkAll - checkNewPools at ${convertToUTCTime(new Date())}`);
    await checkNewPools(false, true, api, pool_generator_calls, pool_contract_calls, poolsSchemaRepository);
    console.log(`Stop checkAll - checkNewPools at ${convertToUTCTime(new Date())}`);
    console.log(`Start checkAll - checkNewNFTPools at ${convertToUTCTime(new Date())}`);
    await checkNewNFTPools(false, true, api, nft_pool_generator_calls, nft_pool_contract_calls, nftPoolsSchemaRepository);
    console.log(`Stop checkAll - checkNewNFTPools at ${convertToUTCTime(new Date())}`);
    console.log(`Start checkAll - checkNewTokens at ${convertToUTCTime(new Date())}`);
    await checkNewTokens(false, true, api, tokensSchemaRepository, token_generator_calls);
    console.log(`Stop checkAll - checkNewTokens at ${convertToUTCTime(new Date())}`);
}


const maxStakingAmount = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string,
    contractType: string,
    is_nft: boolean
): Promise<number> => {
    console.log({
        function: `maxStakingAmount`,
        contractType: contractType,
        maxStakingAmountAddress: contract_to_call.address.toHuman()
    });
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return 0;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }
    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query["genericPoolContractTrait::maxStakingAmount"](
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk && output) {
            // @ts-ignore
            const a = parseFloat(output.toHuman().Ok.replace(/,/g, ""));
            let maxStakingAmount = 0;
            if (is_nft) {
                maxStakingAmount = a;
            } else {
                maxStakingAmount = a / (10 ** 12);
            }
            return maxStakingAmount;
        }
    } catch (e) {
        console.log(`ERROR: maxStakingAmount - ${e.message}`);
        return 0;
    }
    return 0;
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
        const {result, output} = await contract_to_call.query["tokenManagerTrait::getTokenContractAddress"](
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
            // const rewardPool = parseFloat(output.toHuman()?.Ok.replace(/,/g, "")) / (10 ** 12);
            const rewardPool = parseFloat(output.toHuman()?.Ok.replace(/,/g, ""));
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

export const owner = async (
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

const mintTo = async (
    api: ApiPromise,
    contract_to_call: ContractPromise,
    caller_account: string
): Promise<string | undefined> => {
    try {
        if (!contract_to_call) {
            console.log("invalid", contract_to_call);
            return undefined;
        }
        console.log(contract_to_call.address.toHuman());
        if (!caller_account || caller_account?.length == 0) {
            caller_account = `${process.env.CALLER_ACCOUNT}`;
        }
        const gasLimit = readOnlyGasLimit(api);
        const value = 0;
        const {result, output} = await contract_to_call
            .query["mint_to"](
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
    } catch (e) {
        console.log(`ERROR: ${e.messages}`);
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
export const totalSupply = async (
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
        const {result, output} = await psp22_contract_calls.query["psp22Capped::cap"](
            caller_account,
            {value: azero_value, gasLimit: gasLimit}
        );
        if (result.isOk && output) {
            // @ts-ignore
            const data = output.toHuman()?.Ok;
            if (data) {
                // const totalSupply = parseFloat(data.replace(/,/g, "")) / ( 10 ** 12);
                const totalSupply = parseFloat(data.replace(/,/g, ""));
                console.log({totalSupply: totalSupply});
                return totalSupply;
            } else {
                console.log({data: data});
                return 0;
            }
        }
    } catch (e) {
        console.log(`ERROR: totalSupply - ${e.message}`);
        return 0;
    }
    return 0;
}

export const tokenName = async (
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

export const tokenSymbol = async (
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

export const tokenDecimals = async (
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