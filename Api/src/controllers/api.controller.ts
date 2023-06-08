import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  post,
  requestBody,
} from '@loopback/rest';
import {repository} from "@loopback/repository";
import {
  LpPoolsSchemaRepository, NftPoolsSchemaRepository,
  PoolsSchemaRepository,
  TokensSchemaRepository,
  UpdateQueueSchemaRepository
} from "../repositories";
import {ADDRESSES_INW, MESSAGE, PRIVATE_SALE_CONTRACT_ADDRESS, PUBLIC_SALE_CONTRACT_ADDRESS, STATUS} from "../utils/constant";
import {
  ReqGetLpPoolsByAddressType,
  ReqGetLpPoolsByOwnerType,
  ReqGetLpPoolsType, ReqGetNftPoolsByAddressType, ReqGetNftPoolsByOwnerType,
  ReqGetNftPoolsType,
  ReqGetPoolsByAddressType,
  ReqGetPoolsByOwnerType,
  ReqGetPoolsType,
  ReqGetTokensType,
  ReqImportToken,
  ReqImportTokenBody,
  RequestGetLpPoolsBody,
  RequestGetNftPoolsBody,
  RequestGetNftPoolsByAddressBody, RequestGetNftPoolsByOwnerBody,
  RequestGetPoolsByAddressBody,
  RequestGetPoolsByOwnerBody,
  RequestGetTokensBody,
  RequestLpPoolsByAddressBody,
  RequestLpPoolsByOwnerBody,
  RequestPoolsBody,
  RequestUpdateBody,
  ReqUpdateTokenIconBody,
  ReqUpdateTokenIconType,
  ReqUpdateType,
  ResponseBody
} from "../utils/Message";
import {token_generator_contract} from "../contracts/token_generator";
import {lp_pool_generator_contract} from "../contracts/lp_pool_generator";
import {nft_pool_generator_contract} from "../contracts/nft_pool_generator";
import {pool_generator_contract} from "../contracts/pool_generator";
import {Tokens} from "../models";
import { globalApi } from '..';
import { psp22_contract } from '../contracts/psp22';
import { isValidSignature, readOnlyGasLimit, roundUp } from '../utils/utils';
import { ContractPromise } from '@polkadot/api-contract';

export class ApiController {
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
      @inject(RestBindings.Http.REQUEST) private req: Request
  ) {}

  @post('/update')
  async update(
      @requestBody(RequestUpdateBody) req:ReqUpdateType
  ): Promise<ResponseBody> {
    if (!req) return {
      status: STATUS.FAILED,
      message: MESSAGE.NO_INPUT
    };
    const poolContract = req.poolContract;
    const requestType = req.type;
    if (!poolContract) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.INVALID_POOL_CONTRACT
      };
    }
    const queue = await this.updateQueueSchemaRepository.findOne({where: {poolContract: poolContract}});
    if (queue) {
      await this.updateQueueSchemaRepository.updateById(queue._id, {
        requestType: requestType,
        poolContract: poolContract,
        timeStamp: new Date().getTime()
      });
      return {
        status: STATUS.OK,
        ret: "updated",
        message: STATUS.SUCCESS
      };
    } else {
      const create_collection = await this.updateQueueSchemaRepository.create({
        requestType: requestType,
        poolContract: poolContract,
        timeStamp: new Date().getTime()
      });
      return {
        status: STATUS.OK,
        ret: "added",
        message: STATUS.SUCCESS,
        data: create_collection
      };
    }
  }

  @post('/getTokens')
  async getTokens(
      @requestBody(RequestGetTokensBody) req:ReqGetTokensType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NO_INPUT
      };
    }
    let limit = req?.limit;
    let offset = req?.offset;
    const order = req?.sort ? "index DESC" : "index ASC";
    if (!limit) limit = 100;
    if (!offset) offset = 0;

    let tokens = await this.tokensSchemaRepository.find({
      where: {
        tokenGeneratorContractAddress: token_generator_contract.CONTRACT_ADDRESS
      },
      order: [order],
      limit: limit,
      skip: offset
    });

    return {
      status: STATUS.OK,
      message: STATUS.SUCCESS,
      ret: tokens
    };

  }

  @post('/updateTokenUrl')
  async updateTokenUrl(
      @requestBody(ReqUpdateTokenIconBody) req:ReqUpdateTokenIconType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NO_INPUT
      };
    }

    const token = await this.tokensSchemaRepository.findOne({where: {contractAddress: req.contractAddress}})
    if(token) {
      try {
        await this.tokensSchemaRepository.updateById(token._id, {
          tokenIconUrl: req?.tokenIconUrl
        });
    } catch (e) {
        console.log(`ERROR: ProcessTokens updateById - ${e.message}`);
    }
    } else {
      try {
        await this.tokensSchemaRepository.create({
          tokenIconUrl: req?.tokenIconUrl,
          contractAddress: req.contractAddress,
          tokenGeneratorContractAddress: req.tokenGeneratorContractAddress
        });
    } catch (e) {
        console.log(`ERROR: ProcessTokens create - ${e.message}`);
    }
    }
    return {
      status: STATUS.OK,
      message: STATUS.SUCCESS,
    };

  }

  @post('/importToken')
  async importToken(
    @requestBody(ReqImportTokenBody) req: ReqImportToken,
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NO_INPUT,
      };
    }
    const token = await this.tokensSchemaRepository.findOne({
      where: {contractAddress: req.tokenAddress},
    });
    if (token) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.DUPLICATED_TOKEN,
      };
    }
    const contract_to_call = new ContractPromise(
      globalApi,
      psp22_contract.CONTRACT_ABI,
      req.tokenAddress || '',
    );

    const gasLimit = readOnlyGasLimit(globalApi);
    const queryResult: any = await contract_to_call.query['ownable::owner'](
      process.env.CALLER_ACCOUNT ||
        '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc',
      {
        value: 0,
        gasLimit,
      },
    );
    if (!queryResult?.result.isOk)
      return {
        status: STATUS.FAILED,
        message: MESSAGE.INVALID_TOKEN_OWNER,
      };
    const ownerAddress = queryResult.output.toHuman().Ok;
    const signatureValidation = isValidSignature(
      MESSAGE.SIGN_IMPORT_TOKEN,
      req?.signature || '',
      ownerAddress,
    );
    if (!signatureValidation)
      return {
        status: STATUS.FAILED,
        message: MESSAGE.INVALID_SIGNATURE,
      };
    const queryResult1: any = await contract_to_call.query['psp22Capped::cap'](
      process.env.CALLER_ACCOUNT ||
        '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc',
      {value: 0, gasLimit},
    );
    const rawTotalSupply = queryResult1?.output?.toHuman()?.Ok;
    const totalSupply = parseInt(rawTotalSupply.replace(',', ''))
    if (!(totalSupply > 0)) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.INVALID_TOKEN_SUPPLY,
      };
    }

    try {
      await this.tokensSchemaRepository.create({
        name: req?.name,
        symbol: req?.symbol,
        decimal: req?.decimal,
        creator: ownerAddress,
        mintTo: undefined,
        totalSupply: totalSupply,
        index: 0,
        contractAddress: req.tokenAddress,
        tokenGeneratorContractAddress: req?.tokenGeneratorContractAddress,
        tokenIconUrl: req?.tokenIconUrl,
        createdTime: new Date(),
        updatedTime: new Date(),
      });
    } catch (e) {
      console.log(`ERROR: ProcessTokens create - ${e.message}`);
      return {
        status: STATUS.FAILED,
        message: `${MESSAGE.UNKNOW_ERROR} when ProcessTokens create`,
      };
    }
    return {
      status: STATUS.OK,
      message: MESSAGE.IMPORT_TOKEN_SUCCESS,
    };
  }

  @post('/getINWTotalSupply')
  async getINWTotalSupply(): Promise<ResponseBody> {
    const contract_to_call = new ContractPromise(
      globalApi,
      psp22_contract.CONTRACT_ABI,
      process.env.INW_ADDRESS ||
        '5FrXTf3NXRWZ1wzq9Aka7kTGCgGotf6wifzV7RzxoCYtrjiX',
    );
    const gasLimit = readOnlyGasLimit(globalApi);
    const queryResult: any = await contract_to_call.query['psp22::totalSupply'](
      process.env.CALLER_ACCOUNT ||
        '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc',
      {
        value: 0,
        gasLimit,
      },
    );
    if (!queryResult?.result.isOk)
      return {
        status: STATUS.FAILED,
        message: MESSAGE.GET_INW_TOTAL_SUPPLY_FAIL,
      };
    const totalSupply = queryResult?.output?.toHuman()?.Ok;
    return {
      status: STATUS.OK,
      message: MESSAGE.GET_INW_TOTAL_SUPPLY_SUCCESS,
      ret: {
        totalSupply,
      },
    };
  }

  @post('/getINWInCirculation')
  async getINWInCirculation(): Promise<ResponseBody> {
    const contract_to_call = new ContractPromise(
      globalApi,
      psp22_contract.CONTRACT_ABI,
      process.env.INW_ADDRESS ||
        '5FrXTf3NXRWZ1wzq9Aka7kTGCgGotf6wifzV7RzxoCYtrjiX',
    );
    const gasLimit = readOnlyGasLimit(globalApi);
    const queryResult: any = await contract_to_call.query['psp22::totalSupply'](
      process.env.CALLER_ACCOUNT ||
        '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc',
      {
        value: 0,
        gasLimit,
      },
    );
    if (!queryResult?.result.isOk)
      return {
        status: STATUS.FAILED,
        message: MESSAGE.GET_INW_TOTAL_SUPPLY_FAIL,
      };
    let inCirculation = 0
    try {
      const totalSupplyRaw = queryResult?.output?.toHuman()?.Ok;
      const totalSupply: any =
        totalSupplyRaw.replaceAll(',', '') / 10 ** 12 || 0;
      const listContractAccount = [
        ...Object.values(ADDRESSES_INW),
        PUBLIC_SALE_CONTRACT_ADDRESS,
        PRIVATE_SALE_CONTRACT_ADDRESS,
      ];

      let balanceQrs = await Promise.all(
        listContractAccount.map(address => {
          return contract_to_call.query['psp22::balanceOf'](
            process.env.CALLER_ACCOUNT ||
              '5CGUvruJMqB1VMkq14FC8QgR9t4qzjBGbY82tKVp2D6g9LQc',
            {
              value: 0,
              gasLimit,
            },
            address,
          );
        }),
      );
      const sumBalance = balanceQrs.reduce(
        (accumulator, currentValue: any) =>
          accumulator +
          +(currentValue?.output?.toHuman()?.Ok?.replaceAll(',', '') || 0),
        0,
      );
      inCirculation = roundUp(totalSupply - sumBalance / 10 ** 12);
    } catch (error) {
      console.log(error)
      return {
        status: STATUS.FAILED,
        message: MESSAGE.GET_INW_IN_CIRCULATION_FAIL,
        ret: {
          inCirculation,
        },
      };
    }

    return {
      status: STATUS.OK,
      message: MESSAGE.GET_INW_IN_CIRCULATION_SUCCESS,
      ret: {
        inCirculation,
      },
    };
  }

  @post('/getLPPools')
  async getLPPools(
      @requestBody(RequestGetLpPoolsBody) req:ReqGetLpPoolsType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NO_INPUT
      };
    }
    let limit = req?.limit;
    let offset = req?.offset;
    let showZeroPool = req?.showZeroPool;
    if (!limit) limit = 100;
    if (!offset) offset = 0;
    const order = req?.sort ? "startTime DESC" : "startTime ASC";
    let pools = [];
    if (showZeroPool == "false") {
      pools = await this.lpPoolsSchemaRepository.find({
        where: {
          lpPoolGeneratorContractAddress: lp_pool_generator_contract.CONTRACT_ADDRESS,
          rewardPool: {
            gt: 0
          }
        },
        order: [order],
        limit: limit,
        skip: offset
      });
    } else {
      pools = await this.lpPoolsSchemaRepository.find({
        where: {
          lpPoolGeneratorContractAddress: lp_pool_generator_contract.CONTRACT_ADDRESS,
        },
        order: [order],
        limit: limit,
        skip: offset
      });
    }
    return {
      status: STATUS.OK,
      message: STATUS.SUCCESS,
      ret: pools
    };
  }

  @post('/getLPPoolByAddress')
  async getLPPoolByAddress(
      @requestBody(RequestLpPoolsByAddressBody) req:ReqGetLpPoolsByAddressType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NO_INPUT
      };
    }
    let poolContract = req?.poolContract;
    if (!poolContract) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NOT_FOUND_POOL_CONTRACT,
        ret: []
      };
    }
    let pool = await this.lpPoolsSchemaRepository.find({
      where: {
        poolContract: poolContract
      }
    });
    return {
      status: STATUS.OK,
      message: STATUS.SUCCESS,
      ret: pool
    };
  }

  @post('/getLPPoolByOwner')
  async getLPPoolByOwner(
      @requestBody(RequestLpPoolsByOwnerBody) req:ReqGetLpPoolsByOwnerType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NO_INPUT
      };
    }
    const owner = req?.owner;
    if (!owner) {
      return {
        status: STATUS.OK,
        message: MESSAGE.NOT_FOUND_OWNER,
        ret:[]
      }
    }
    let pool = await this.lpPoolsSchemaRepository.find({
      where: {
        owner: owner
      }
    });
    return {
      status: STATUS.OK,
      message: STATUS.SUCCESS,
      ret:pool
    };
  }

  @post('/getPools')
  async getPools(
      @requestBody(RequestPoolsBody) req:ReqGetPoolsType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NO_INPUT
      };
    }
    let limit = req?.limit;
    let offset = req?.offset;
    let showZeroPool = req?.showZeroPool;
    if (!limit) limit = 100;
    if (!offset) offset = 0;
    const order = req?.sort ? "startTime DESC" : "startTime ASC";
    let pools = [];
    if (showZeroPool == "false") {
      pools = await this.poolsSchemaRepository.find({
        where: {
          poolGeneratorContractAddress: pool_generator_contract.CONTRACT_ADDRESS,
          rewardPool: {
            gt: 0
          }
        },
        order: [order],
        limit: limit,
        skip: offset
      });
    } else {
      pools = await this.poolsSchemaRepository.find({
        where: {
          poolGeneratorContractAddress: pool_generator_contract.CONTRACT_ADDRESS,
        },
        order: [order],
        limit: limit,
        skip: offset
      });
    }
    return {
      status: STATUS.OK,
      message: STATUS.SUCCESS,
      ret: pools
    };
  }

  @post('/getPoolByAddress')
  async getPoolByAddress(
      @requestBody(RequestGetPoolsByAddressBody) req:ReqGetPoolsByAddressType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NO_INPUT
      };
    }
    let poolContract = req?.poolContract;
    if (!poolContract) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NOT_FOUND_POOL_CONTRACT,
        ret: []
      }
    }
    let pool = await this.poolsSchemaRepository.find({
      where: {
        poolContract: poolContract
      }
    });
    return {
      status: STATUS.OK,
      message: STATUS.SUCCESS,
      ret: pool
    };
  }

  @post('/getPoolByOwner')
  async getPoolByOwner(
      @requestBody(RequestGetPoolsByOwnerBody) req:ReqGetPoolsByOwnerType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NO_INPUT
      };
    }
    let owner = req?.owner;
    if (!owner) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NOT_FOUND_OWNER,
        ret: []
      }
    }
    let pool = await this.poolsSchemaRepository.find({
      where: {
        owner: owner
      }
    });
    return {
      status: STATUS.OK,
      message: STATUS.SUCCESS,
      ret: pool
    };
  }

  @post('/getNFTPools')
  async getNFTPools(
      @requestBody(RequestGetNftPoolsBody) req:ReqGetNftPoolsType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NO_INPUT
      };
    }
    let limit = req?.limit;
    let offset = req?.offset;
    let showZeroPool = req?.showZeroPool;
    if (!limit) limit = 100;
    if (!offset) offset = 0;
    const order = req?.sort ? "startTime DESC" : "startTime ASC";
    let pools = [];
    if (showZeroPool == "false") {
      pools = await this.nftPoolsSchemaRepository.find({
        where: {
          nftPoolGeneratorContractAddress: nft_pool_generator_contract.CONTRACT_ADDRESS,
          rewardPool: {
            gt: 0
          }
        },
        order: [order],
        limit: limit,
        skip: offset
      });
    }
    else {
      pools = await this.nftPoolsSchemaRepository.find({
        where: {
          nftPoolGeneratorContractAddress: nft_pool_generator_contract.CONTRACT_ADDRESS,
        },
        order: [order],
        limit: limit,
        skip: offset
      });
    }
    return {
      status: STATUS.OK,
      message: STATUS.SUCCESS,
      ret: pools
    };
  }

  @post('/getNFTPoolByAddress')
  async getNFTPoolByAddress(
      @requestBody(RequestGetNftPoolsByAddressBody) req:ReqGetNftPoolsByAddressType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NO_INPUT
      };
    }
    let poolContract = req?.poolContract;
    if (!poolContract) {
      return {
        status: STATUS.OK,
        message: MESSAGE.NOT_FOUND_POOL_CONTRACT,
        ret:[]
      };
    }
    let pool = await this.nftPoolsSchemaRepository.find({
      where: {
        poolContract: poolContract
      }
    });
    return {
      status: STATUS.OK,
      message: STATUS.SUCCESS,
      ret: pool
    };
  }

  @post('/getNFTPoolByOwner')
  async getNFTPoolByOwner(
      @requestBody(RequestGetNftPoolsByOwnerBody) req:ReqGetNftPoolsByOwnerType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: STATUS.FAILED,
        message: MESSAGE.NO_INPUT
      };
    }
    let owner = req?.owner;
    if (!owner) {
      return {
        status: STATUS.OK,
        message: MESSAGE.NOT_FOUND_OWNER,
        ret:[]
      };
    }
    let pool = await this.nftPoolsSchemaRepository.find({
      where: {
        owner: owner
      }
    });
    return {
      status: STATUS.OK,
      message: STATUS.SUCCESS,
      ret: pool
    };
  }
}
