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
import {FAILED, OK, SUCCESS} from "../utils/constant";
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
  ReqUpdateType,
  ResponseBody
} from "../utils/Message";

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
      status: FAILED,
      message: "No Input"
    };
    const poolContract = req.poolContract;
    const requestType = req.type;
    if (!poolContract) {
      return {
        status: FAILED,
        message: "Invalid poolContract"
      };
    }
    const queue = await this.updateQueueSchemaRepository.findOne({where: {poolContract: poolContract}});
    if (queue) {
      return {
        status: FAILED,
        message: "exist"
      };
    }
    const create_collection = await this.updateQueueSchemaRepository.create({
      requestType: requestType,
      poolContract: poolContract,
      timeStamp: new Date().getTime()
    });
    return {
      status: OK,
      ret: "added",
      message: SUCCESS,
      data: create_collection
    };
  }

  @post('/getTokens')
  async getTokens(
      @requestBody(RequestGetTokensBody) req:ReqGetTokensType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: FAILED,
        message: "No Input"
      };
    }
    let limit = req?.limit;
    let offset = req?.offset;
    const order = req?.sort ? "index DESC" : "index ASC";
    if (!limit) limit = 100;
    if (!offset) offset = 0;

    const tokens = await this.tokensSchemaRepository.find({
      where: {},
      order: [order],
      limit: limit,
      skip: offset
    });

    return {
      status: OK,
      message: SUCCESS,
      ret: tokens
    };

  }

  @post('/getLPPools')
  async getLPPools(
      @requestBody(RequestGetLpPoolsBody) req:ReqGetLpPoolsType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: FAILED,
        message: "No Input"
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
        where: {},
        order: [order],
        limit: limit,
        skip: offset
      });
    }
    return {
      status: OK,
      message: SUCCESS,
      ret: pools
    };
  }

  @post('/getLPPoolByAddress')
  async getLPPoolByAddress(
      @requestBody(RequestLpPoolsByAddressBody) req:ReqGetLpPoolsByAddressType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: FAILED,
        message: "No Input"
      };
    }
    let poolContract = req?.poolContract;
    if (!poolContract) {
      return {
        status: FAILED,
        message: 'Not found the pool contract',
        ret: []
      };
    }
    let pool = await this.lpPoolsSchemaRepository.find({
      where: {
        poolContract: poolContract
      }
    });
    return {
      status: OK,
      message: SUCCESS,
      ret: pool
    };
  }

  @post('/getLPPoolByOwner')
  async getLPPoolByOwner(
      @requestBody(RequestLpPoolsByOwnerBody) req:ReqGetLpPoolsByOwnerType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: FAILED,
        message: "No Input"
      };
    }
    const owner = req?.owner;
    if (!owner) {
      return {
        status: OK,
        message: "No owner",
        ret:[]
      }
    }
    let pool = await this.lpPoolsSchemaRepository.find({
      where: {
        owner: owner
      }
    });
    return {
      status: OK,
      message: SUCCESS,
      ret:pool
    };
  }

  @post('/getPools')
  async getPools(
      @requestBody(RequestPoolsBody) req:ReqGetPoolsType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: FAILED,
        message: "No Input"
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
        where: {},
        order: [order],
        limit: limit,
        skip: offset
      });
    }
    return {
      status: OK,
      message: SUCCESS,
      ret: pools
    };
  }

  @post('/getPoolByAddress')
  async getPoolByAddress(
      @requestBody(RequestGetPoolsByAddressBody) req:ReqGetPoolsByAddressType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: FAILED,
        message: "No Input"
      };
    }
    let poolContract = req?.poolContract;
    if (!poolContract) {
      return {
        status: FAILED,
        message: 'Not found the pool contract',
        ret: []
      }
    }
    let pool = await this.poolsSchemaRepository.find({
      where: {
        poolContract: poolContract
      }
    });
    return {
      status: OK,
      message: SUCCESS,
      ret: pool
    };
  }

  @post('/getPoolByOwner')
  async getPoolByOwner(
      @requestBody(RequestGetPoolsByOwnerBody) req:ReqGetPoolsByOwnerType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: FAILED,
        message: "No Input"
      };
    }
    let owner = req?.owner;
    if (!owner) {
      return {
        status: FAILED,
        message: 'Not found owner',
        ret: []
      }
    }
    let pool = await this.poolsSchemaRepository.find({
      where: {
        owner: owner
      }
    });
    return {
      status: OK,
      message: SUCCESS,
      ret: pool
    };
  }

  @post('/getNFTPools')
  async getNFTPools(
      @requestBody(RequestGetNftPoolsBody) req:ReqGetNftPoolsType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: FAILED,
        message: "No Input"
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
        where: {},
        order: [order],
        limit: limit,
        skip: offset
      });
    }
    return {
      status: OK,
      message: SUCCESS,
      ret: pools
    };
  }

  @post('/getNFTPoolByAddress')
  async getNFTPoolByAddress(
      @requestBody(RequestGetNftPoolsByAddressBody) req:ReqGetNftPoolsByAddressType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: FAILED,
        message: "No Input"
      };
    }
    let poolContract = req?.poolContract;
    if (!poolContract) {
      return {
        status: OK,
        message: "Not found the pool contract",
        ret:[]
      };
    }
    let pool = await this.nftPoolsSchemaRepository.find({
      where: {
        poolContract: poolContract
      }
    });
    return {
      status: OK,
      message: SUCCESS,
      ret: pool
    };
  }

  @post('/getNFTPoolByOwner')
  async getNFTPoolByOwner(
      @requestBody(RequestGetNftPoolsByOwnerBody) req:ReqGetNftPoolsByOwnerType
  ): Promise<ResponseBody> {
    if (!req) {
      return {
        status: FAILED,
        message: "No Input"
      };
    }
    let owner = req?.owner;
    if (!owner) {
      return {
        status: OK,
        message: "Not found owner",
        ret:[]
      };
    }
    let pool = await this.nftPoolsSchemaRepository.find({
      where: {
        owner: owner
      }
    });
    return {
      status: OK,
      message: SUCCESS,
      ret: pool
    };
  }
}
