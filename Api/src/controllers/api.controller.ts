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
import {MESSAGE, STATUS} from "../utils/constant";
import {
  ReqGetLpPoolsByAddressType,
  ReqGetLpPoolsByOwnerType,
  ReqGetLpPoolsType, ReqGetNftPoolsByAddressType, ReqGetNftPoolsByOwnerType,
  ReqGetNftPoolsType,
  ReqGetPoolsByAddressType,
  ReqGetPoolsByOwnerType,
  ReqGetPoolsType,
  ReqGetTokensType,
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
