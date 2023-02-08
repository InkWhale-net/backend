import {ContractPromise} from "@polkadot/api-contract";
import {ApiPromise} from "@polkadot/api";
import {AccountId} from "@polkadot/types/interfaces";
import {NftPoolsSchemaRepository, UpdateQueueSchemaRepository} from "../repositories";

// let pool_generator_calls = null;
// let pool_contract_calls = null;
// let lp_pool_generator_calls = null;
// let lp_pool_contract_calls = null;
// let nft_pool_generator_calls = null;
// let nft_pool_contract_calls = null;
// let psp22_contract_calls = null;
// let token_generator_calls = null;
let is_running = false;
let is_running_nft = false;
let is_running_lp = false;
let is_running_tokens = false;
let is_check_queue = false;

const checkQueue = async (
    pool_generator_calls: ContractPromise,
    nft_pool_generator_calls: ContractPromise,
    lp_pool_generator_calls: ContractPromise,
    token_generator_calls: ContractPromise,
    nft_pool_contract_calls: ContractPromise,
    lp_pool_contract_calls: ContractPromise,
    updateQueueSchemaRepository : UpdateQueueSchemaRepository,
    api: ApiPromise
) =>{
    if (is_check_queue) return;
    is_check_queue = true;
    try{
        let queue_data = await updateQueueSchemaRepository.find({});
        let records_length = queue_data.length;

        for (let j = 0; j < records_length; j++) {
            let poolContract:string = queue_data[j].poolContract!;
            let requestType = queue_data[j].requestType;
            console.log("processing queue for ",requestType, poolContract);
            if (poolContract == "new"){
                if (requestType == "nft")
                    await checkNewNFTPools(nft_pool_generator_calls);
                else if (requestType == "lp")
                    await checkNewLPPools(lp_pool_generator_calls);
                else if (requestType == "pool")
                    await checkNewPools(pool_generator_calls);
                else if (requestType == "token")
                    await checkNewTokens(token_generator_calls);
            }
            else {
                if (requestType == "nft")
                    await ProcessNFT(poolContract, api, nft_pool_contract_calls);
                else if (requestType == "lp")
                    await ProcessLP(poolContract, api, lp_pool_contract_calls);
                else if (requestType == "pool")
                    await ProcessPool(poolContract, api);
            }

            await updateQueueSchemaRepository.deleteAll({
                poolContract: poolContract
            });
        }

        is_check_queue = false;
    }
    catch (e){
        console.log("checkQueue",e.message);
        is_check_queue = false;
    }

}
const ProcessNFT = async (
    poolContract: string,
    api: ApiPromise,
    nft_pool_contract_calls:ContractPromise,
    nftPoolsSchemaRepository : NftPoolsSchemaRepository
) =>{
    nft_pool_contract_calls = new ContractPromise(
        api,
        nft_pool_contract.CONTRACT_ABI,
        poolContract,
    );
    //console.log(pool_contract);
    let _multiplier = await multiplier(nft_pool_contract_calls, '');
    let _rewardPool = await rewardPool(nft_pool_contract_calls, '');
    let _totalStaked = await totalStaked(nft_pool_contract_calls,'',true);
    let _startTime = await startTime(nft_pool_contract_calls, '');
    let _duration = await duration(nft_pool_contract_calls, '');
    let _tokenContract: string = await psp22ContractAddress(nft_pool_contract_calls, '');
    let _NFTtokenContract = await psp34ContractAddress(nft_pool_contract_calls, '');
    let _owner = await owner(nft_pool_contract_calls, '');

    if (!_tokenContract) return;
    //console.log(poolContract,apy,rewardPool,totalStaked,tokenContract);
    let psp22_contract_calls = new ContractPromise(
        api,
        psp22_contract.CONTRACT_ABI,
        _tokenContract,
    );

    let _tokenName = await tokenName('', psp22_contract_calls);
    let _tokenSymbol = await tokenSymbol('', psp22_contract_calls);
    let _tokenDecimal = await tokenDecimals('', psp22_contract_calls);
    let _tokenTotalSupply = await totalSupply('', psp22_contract_calls);

    let collection = await nftPoolsSchemaRepository.findOne({
        where: {
            poolContract: poolContract
        }
    });

    if (collection){
        //console.log('Already Exists, update',poolContract,_rewardPool);
        await database.NFTPools.updateOne({poolContract},{
            NFTtokenContract: _NFTtokenContract,
            tokenContract: _tokenContract,
            tokenName: _tokenName,
            tokenSymbol: _tokenSymbol,
            tokenDecimal: _tokenDecimal,
            duration: _duration,
            startTime: _startTime,
            tokenTotalSupply: _tokenTotalSupply,
            rewardPool: _rewardPool,
            totalStaked: _totalStaked,
            multiplier: _multiplier,
            owner: _owner
        });
    }
    else{
        let create_collection = await database.NFTPools.create({
            poolContract,
            tokenContract: _tokenContract,
            tokenName: _tokenName,
            tokenSymbol: _tokenSymbol,
            tokenDecimal: _tokenDecimal,
            duration: _duration,
            startTime: _startTime,
            tokenTotalSupply: _tokenTotalSupply,
            rewardPool: _rewardPool,
            totalStaked: _totalStaked,
            multiplier: _multiplier,
        });
    }
}
const ProcessPool = async (
    poolContract: string | AccountId,
    api: ApiPromise
    ) => {
    let pool_contract_calls = new ContractPromise(
        api,
        pool_contract.CONTRACT_ABI,
        poolContract,
    );
    //console.log(pool_contract);
    let _apy = await apy(pool_contract_calls, '');
    let _rewardPool = await rewardPool(pool_contract_calls, '');
    let _totalStaked = await totalStaked(pool_contract_calls,'',false);
    let _startTime = await startTime(pool_contract_calls, '');
    let _duration = await duration(pool_contract_calls, '');
    let _tokenContract: string | AccountId = await psp22ContractAddress(pool_contract_calls, '');
    let _owner = await owner(pool_contract_calls, '');

    if (!_tokenContract) return;
    //console.log(poolContract,apy,rewardPool,totalStaked,tokenContract);
    let psp22_contract_calls = new ContractPromise(
        api,
        psp22_contract.CONTRACT_ABI,
        _tokenContract,
    );

    let _tokenName = await tokenName('', psp22_contract_calls);
    let _tokenSymbol = await tokenSymbol('', psp22_contract_calls);
    let _tokenDecimal = await tokenDecimals('', psp22_contract_calls);
    let _tokenTotalSupply = await totalSupply('', psp22_contract_calls);

    let collection = await database.Pools.findOne({poolContract});

    if (collection){
        //console.log('Already Exists, update',poolContract,_rewardPool);
        await database.Pools.updateOne({poolContract},{
            tokenContract: _tokenContract,
            tokenName: _tokenName,
            tokenSymbol: _tokenSymbol,
            tokenDecimal: _tokenDecimal,
            duration: _duration,
            startTime: _startTime,
            tokenTotalSupply: _tokenTotalSupply,
            rewardPool: _rewardPool,
            totalStaked: _totalStaked,
            apy: _apy,
            owner: _owner
        });
    }
    else{
        let create_collection = await database.Pools.create({
            poolContract,
            tokenContract: _tokenContract,
            tokenName: _tokenName,
            tokenSymbol: _tokenSymbol,
            tokenDecimal: _tokenDecimal,
            duration: _duration,
            startTime: _startTime,
            tokenTotalSupply: _tokenTotalSupply,
            rewardPool: _rewardPool,
            totalStaked: _totalStaked,
            apy: _apy,
            owner: _owner
        });
    }
}
const ProcessLP = async (
    poolContract: string | AccountId,
    api: ApiPromise,
    lp_pool_contract_calls: ContractPromise
) => {
    lp_pool_contract_calls = new ContractPromise(
        api,
        lp_pool_contract.CONTRACT_ABI,
        poolContract,
    );
    //console.log(pool_contract);
    let _multiplier = await multiplier(lp_pool_contract_calls, '');
    let _rewardPool = await rewardPool(lp_pool_contract_calls, '');
    let _totalStaked = await totalStaked(lp_pool_contract_calls,'',false);
    let _startTime = await startTime(lp_pool_contract_calls, '');
    let _duration = await duration(lp_pool_contract_calls, '');
    let _tokenContract: string = await psp22ContractAddress(lp_pool_contract_calls, '');
    let _lptokenContract: string = await lpContractAddress(lp_pool_contract_calls, '');
    let _owner = await owner(lp_pool_contract_calls, '');

    if (!_tokenContract) return;
    //console.log(poolContract,apy,rewardPool,totalStaked,tokenContract);
    let psp22_contract_calls = new ContractPromise(
        api,
        psp22_contract.CONTRACT_ABI,
        _tokenContract,
    );

    let _tokenName = await tokenName('', psp22_contract_calls);
    let _tokenSymbol = await tokenSymbol('', psp22_contract_calls);
    let _tokenDecimal = await tokenDecimals('', psp22_contract_calls);
    let _tokenTotalSupply = await totalSupply('', psp22_contract_calls);

    psp22_contract_calls = new ContractPromise(
        api,
        psp22_contract.CONTRACT_ABI,
        _lptokenContract,
    );

    let _lptokenName = await tokenName('', psp22_contract_calls);
    let _lptokenSymbol = await tokenSymbol('', psp22_contract_calls);
    let _lptokenDecimal = await tokenDecimals('', psp22_contract_calls);
    let _lptokenTotalSupply = await totalSupply('', psp22_contract_calls);

    let collection = await database.LPPools.findOne({poolContract});

    if (collection){
        //console.log('Already Exists, update',poolContract,_rewardPool);
        await database.LPPools.updateOne({poolContract},{
            lptokenContract: _lptokenContract,
            lptokenName: _lptokenName,
            lptokenSymbol: _lptokenSymbol,
            lptokenDecimal: _lptokenDecimal,
            tokenContract: _tokenContract,
            tokenName: _tokenName,
            tokenSymbol: _tokenSymbol,
            tokenDecimal: _tokenDecimal,
            duration: _duration,
            startTime: _startTime,
            tokenTotalSupply: _tokenTotalSupply,
            lptokenTotalSupply: _lptokenTotalSupply,
            rewardPool: _rewardPool,
            totalStaked: _totalStaked,
            multiplier: _multiplier,
            owner: _owner
        });
    }
    else{
        let create_collection = await database.LPPools.create({
            poolContract,
            lptokenContract: _lptokenContract,
            lptokenName: _lptokenName,
            lptokenSymbol: _lptokenSymbol,
            lptokenDecimal: _lptokenDecimal,
            tokenContract: _tokenContract,
            tokenName: _tokenName,
            tokenSymbol: _tokenSymbol,
            tokenDecimal: _tokenDecimal,
            duration: _duration,
            startTime: _startTime,
            tokenTotalSupply: _tokenTotalSupply,
            rewardPool: _rewardPool,
            totalStaked: _totalStaked,
            multiplier: _multiplier,
            owner: _owner
        });
    }
}
const ProcessTokens = async (token_generator_calls: ContractPromise, index:number) =>{
    //console.log(index);
    let tokenInfo = await getTokenInfo(
        token_generator_calls,
        '',
        index
    );
    tokenInfo.index = index;
    console.log(tokenInfo);
    let token = await database.Tokens.findOne({contractAddress:tokenInfo.contractAddress});

    tokenInfo.totalSupply = tokenInfo.totalSupply.replace(/\,/g, "") / (10 ** parseInt(tokenInfo.decimal));

    if (token){
        //console.log('Already Exists, update',poolContract,_rewardPool);
        await database.Tokens.updateOne({contractAddress:tokenInfo.contractAddress},{
            name: tokenInfo.name,
            symbol: tokenInfo.symbol,
            decimal: tokenInfo.decimal,
            creator: tokenInfo.creator,
            mintTo: tokenInfo.mintTo,
            totalSupply: tokenInfo.totalSupply,
            index: tokenInfo.index
        });
    }
    else
    {
        await database.Tokens.create(tokenInfo)
    }
}

const checkNewNFTPools = async (nft_pool_generator_calls: ContractPromise) => {
    if (is_running_nft){
        console.log("checkNewNFTPools is running. Do nothing.");
        return;
    }
    try{
        is_running_nft = true;
        let poolCount = await getPoolCount(nft_pool_generator_calls, '');
        //console.log('poolCount',poolCount);
        let pools = [];
        for (let index = poolCount; index > 0; index--) {
            // console.log(index);
            let poolContract = await getPool(nft_pool_generator_calls,
                null,
                index
            );
            //console.log('poolContract', poolContract);
            if (!poolContract) continue;
            await ProcessNFT(poolContract);
        }
        is_running_nft = false;
    }
    catch (e){
        is_running_nft = false;
        console.log(e.message);
    }

}

const checkNewPools = async (pool_generator_calls: ContractPromise) => {
    if (is_running){
        console.log("checkNewPools is running. Do nothing.");
        return;
    }
    try{
        is_running = true;
        let poolCount = await getPoolCount(pool_generator_calls, '');
        //console.log('poolCount',poolCount);
        let pools = [];
        for (let index = poolCount; index > 0; index--) {
            // console.log(index);
            let poolContract = await getPool(pool_generator_calls,
                null,
                index
            );
            //console.log('poolContract', poolContract);
            if (!poolContract) continue;
            await ProcessPool(poolContract);
        }
        is_running = false;
    }
    catch (e){
        is_running = false;
        console.log(e.message);
    }

}

const checkNewLPPools = async (lp_pool_generator_calls: ContractPromise) => {
    if (is_running_lp){
        console.log("checkNewLPPools is running. Do nothing.");
        return;
    }
    try{
        is_running_lp = true;
        let poolCount = await getPoolCount(lp_pool_generator_calls, '');
        console.log('LP poolCount',poolCount);
        let pools = [];
        for (let index = poolCount; index > 0; index--) {
            // console.log(index);
            let poolContract = await getPool(lp_pool_generator_calls,
                null,
                index
            );
            //console.log('poolContract', poolContract);
            if (!poolContract) continue;
            await ProcessLP(poolContract);

        }
        is_running_lp = false;
    }
    catch (e){
        is_running_lp = false;
        console.log(e.message);
    }

}

const checkNewTokens = async (token_generator_calls: ContractPromise) =>{
    if (is_running_tokens){
        console.log("checkNewTokens is running. Do nothing.");
        return;
    }
    try{
        is_running_tokens = true;
        let tokenCount = await getTokenCount(token_generator_calls,null);
        // console.log(tokenCount);
        let tokens = [];
        for (let index = tokenCount; index > 0 ; index--) {
            let token = await database.Tokens.findOne({index});
            if (!token)
                await ProcessTokens(token_generator_calls, index);
        }
    }
    catch(e){
        is_running_tokens = false;
        console.log(e.message);
    }
    is_running_tokens = false;
}

const checkAll = async (
    pool_generator_calls: ContractPromise,
    nft_pool_generator_calls: ContractPromise,
    lp_pool_generator_calls: ContractPromise,
    token_generator_calls: ContractPromise,
    ) =>{
    await checkNewPools(pool_generator_calls);
    await checkNewNFTPools(nft_pool_generator_calls);
    await checkNewLPPools(lp_pool_generator_calls);
    await checkNewTokens(token_generator_calls);
}

//token_generator_calls
const getTokenInfo = async (contract_to_call: ContractPromise, caller_account:string, index: number) => {
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query["tokenManagerTrait::getTokenInfo"](
            caller_account,
            { value: azero_value, gasLimit },
            index
        );
        if (result.isOk) {
            return output.toHuman();
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const getTokenCount = async (contract_to_call,caller_account) => {
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query["tokenManagerTrait::getTokenCount"](
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk) {
            // console.log(output.toHuman());
            const a = output.toHuman().replace(/\,/g, "");
            return a;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

// pool_generator_calls
const getPoolCount = async (contract_to_call:ContractPromise, caller_account:string) => {
    if (!contract_to_call) {
        console.log('invalid', contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc';
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query["genericPoolGeneratorTrait::getPoolCount"](
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk) {
            // console.log(output.toHuman());
            const a = output.toHuman().replace(/\,/g, '');
            return a;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}
const getPool = async (contract_to_call, caller_account, index) => {
    if (!contract_to_call) {
        console.log('invalid', contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc';
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query["genericPoolGeneratorTrait::getPool"](
            caller_account,
            { value: azero_value, gasLimit },
            index
        );
        if (result.isOk) {
            return output.toHuman();
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

// pool_contract_calls
const apy = async (contract_to_call: ContractPromise, caller_account:string) => {
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query.apy(
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk) {
            // console.log(output.toHuman());
            const a = output.toHuman().replace(/\,/g, "");
            return a;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}
const multiplier = async (contract_to_call: ContractPromise, caller_account:string) => {
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query["genericPoolContractTrait::multiplier"](
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk) {
            // console.log(output.toHuman());
            const a = output.toHuman().replace(/\,/g, "");
            return a;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const rewardPool = async (contract_to_call: ContractPromise, caller_account:string) => {
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query["genericPoolContractTrait::rewardPool"](
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk) {
            // console.log(output.toHuman());
            const a = output.toHuman().replace(/\,/g, "");
            return a / 10 ** 12;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const totalStaked = async (contract_to_call: ContractPromise, caller_account:string, is_nft:boolean) => {
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query["genericPoolContractTrait::totalStaked"](
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk) {
            // console.log(output.toHuman());
            const a = output.toHuman().replace(/\,/g, "");
            if (is_nft) return a / 1;
            return a / 10 ** 12;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const getStakeInfo = async (contract_to_call, caller_account, staker) => {
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query["genericPoolContractTrait::getStakeInfo"](
            caller_account,
            { value: azero_value, gasLimit },
            staker
        );
        if (result.isOk) {
            // console.log(output.toHuman());
            //const a = output.toHuman().replace(/\,/g, "");
            return output.toHuman();
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

// Return: string | AccountId
const psp22ContractAddress = async (contract_to_call:ContractPromise, caller_account:string) => {
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query["genericPoolContractTrait::psp22ContractAddress"](
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk && output) {
            return output.toHuman();
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const lpContractAddress = async (contract_to_call:ContractPromise, caller_account:string) => {
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query.lpContractAddress(
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk) {
            return output.toHuman();
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const psp34ContractAddress = async (contract_to_call:ContractPromise, caller_account:string) => {
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query.psp34ContractAddress(
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk && output) {
            return output.toHuman();
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const duration = async (contract_to_call: ContractPromise, caller_account:string) => {
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query["genericPoolContractTrait::duration"](
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk && output) {
            // console.log(output.toHuman());
            // @ts-ignore
            let a = output.toHuman().replace(/\,/g, "");
            return a/1000;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const startTime = async (contract_to_call: ContractPromise, caller_account:string) => {
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await contract_to_call.query["genericPoolContractTrait::startTime"](
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk) {
            // console.log(output.toHuman());
            const a = output.toHuman().replace(/\,/g, "");
            return a/1;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const owner = async (contract_to_call:ContractPromise, caller_account:string) => {
    if (!contract_to_call) {
        console.log("invalid",contract_to_call);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const value = 0;

    const { result, output } = await contract_to_call.query["ownable::owner"](caller_account, {
        value,
        gasLimit,
    });
    if (result.isOk) {
        return output.toHuman();
    }
    return null;
}

// psp22_contract_calls
const balanceOf = async (caller_account:string, account, psp22_contract_calls: ContractPromise) => {
    if (!psp22_contract_calls) {
        console.log("invalid", psp22_contract_calls);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;

    try {
        const { result, output } = await psp22_contract_calls.query["psp22::balanceOf"](
            caller_account,
            { value: azero_value, gasLimit },
            account
        );
        if (result.isOk) {
            // console.log(output.toHuman());
            const a = output.toHuman().replace(/\,/g, "");
            return a / 10 ** 12;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}
const totalSupply = async (caller_account:string, psp22_contract_calls: ContractPromise) => {
    if (!psp22_contract_calls) {
        console.log("invalid",psp22_contract_calls);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;
    try {
        const { result, output } = await psp22_contract_calls.query["psp22::totalSupply"](
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk) {
            // console.log(output.toHuman());
            const a = output.toHuman().replace(/\,/g, "");
            return a / 10 ** 12;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const tokenName = async (caller_account:string, psp22_contract_calls: ContractPromise) => {
    if (!psp22_contract_calls) {
        console.log("invalid",psp22_contract_calls);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;

    try {
        const { result, output } = await psp22_contract_calls.query["psp22Metadata::tokenName"](
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk) {
            return output.toHuman();
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const tokenSymbol = async (caller_account:string, psp22_contract_calls: ContractPromise) => {
    if (!psp22_contract_calls) {
        console.log("invalid",psp22_contract_calls);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;

    try {
        const { result, output } = await psp22_contract_calls.query["psp22Metadata::tokenSymbol"](
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk) {
            return output.toHuman();
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}

const tokenDecimals = async (caller_account:string, psp22_contract_calls: ContractPromise) => {
    if (!psp22_contract_calls) {
        console.log("invalid",psp22_contract_calls);
        return null;
    }
    if (!caller_account) {
        caller_account = "5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc";
    }

    const gasLimit = -1;
    const azero_value = 0;

    try {
        const { result, output } = await psp22_contract_calls.query["psp22Metadata::tokenDecimals"](
            caller_account,
            { value: azero_value, gasLimit }
        );
        if (result.isOk) {
            return output.toHuman();
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    return null;
}