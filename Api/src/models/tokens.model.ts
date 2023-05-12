import {Entity, model, property} from '@loopback/repository';

@model()
export class Tokens extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  symbol?: string;

  @property({
    type: 'number',
  })
  decimal?: number;

  @property({
    type: 'string',
  })
  contractAddress?: string;

  @property({
    type: 'string',
  })
  tokenGeneratorContractAddress?: string;

  @property({
    type: 'string',
  })
  creator?: string;

  @property({
    type: 'string',
  })
  mintTo?: string;

  @property({
    type: 'string',
  })
  tokenIconUrl?: string;

  @property({
    type: 'number',
  })
  totalSupply?: number;

  @property({
    type: 'number',
  })
  index?: number;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;


  constructor(data?: Partial<Tokens>) {
    super(data);
  }
}

export interface TokensSchemaRelations {
  // describe navigational properties here
}

export type TokensSchemaWithRelations = Tokens & TokensSchemaRelations;
