import {Entity, model, property} from '@loopback/repository';

@model()
export class Pools extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'string',
  })
  owner?: string;

  @property({
    type: 'string',
  })
  poolContract?: string;

  @property({
    type: 'string',
  })
  tokenContract?: string;

  @property({
    type: 'string',
  })
  tokenName?: string;

  @property({
    type: 'string',
  })
  tokenSymbol?: string;

  @property({
    type: 'number',
  })
  tokenDecimal?: number;

  @property({
    type: 'number',
  })
  duration?: number;

  @property({
    type: 'number',
  })
  startTime?: number;

  @property({
    type: 'number',
  })
  tokenTotalSupply?: number;

  @property({
    type: 'number',
  })
  rewardPool?: number;

  @property({
    type: 'string',
  })
  totalStaked?: string;

  @property({
    type: 'number',
  })
  apy?: number;

  @property({
    type: 'number',
  })
  maxStakingAmount?: number;

  @property({
    type: 'string',
  })
  poolGeneratorContractAddress?: string;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;


  constructor(data?: Partial<Pools>) {
    super(data);
  }
}

export interface PoolsSchemaRelations {
  // describe navigational properties here
}

export type PoolsSchemaWithRelations = Pools & PoolsSchemaRelations;
