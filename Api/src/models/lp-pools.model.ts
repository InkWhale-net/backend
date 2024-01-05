import {Entity, model, property} from '@loopback/repository';

@model()
export class LpPools extends Entity {
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
  lptokenContract?: string;

  @property({
    type: 'string',
  })
  lpPoolGeneratorContractAddress?: string;

  @property({
    type: 'string',
  })
  lptokenName?: string;

  @property({
    type: 'string',
  })
  lptokenSymbol?: string;

  @property({
    type: 'number',
  })
  lptokenDecimal?: number;

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
    type: 'string',
  })
  tokenTotalSupply?: string;

  @property({
    type: 'string',
  })
  lptokenTotalSupply?: string;

  @property({
    type: 'string',
  })
  rewardPool?: string;

  @property({
    type: 'string',
  })
  totalStaked?: string;

  @property({
    type: 'string',
  })
  maxStakingAmount?: string;

  @property({
    type: 'number',
  })
  multiplier?: number;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;


  constructor(data?: Partial<LpPools>) {
    super(data);
  }
}

export interface LpPoolsSchemaRelations {
  // describe navigational properties here
}

export type LpPoolsSchemaWithRelations = LpPools & LpPoolsSchemaRelations;
