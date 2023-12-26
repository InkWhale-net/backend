import {Entity, Model, model, property} from '@loopback/repository';

@model()
export class EventTransfer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'number',
    required: true,
  })
  blockNumber: number;

  @property({
    type: 'number',
  })
  eventIndex?: number;

  @property({
    type: 'string',
  })
  method?: string;

  @property({
    type: 'string',
  })
  fromAddress: string;

  @property({
    type: 'string',
  })
  toAddress: string;

  @property({
    type: 'string',
  })
  tokenAddress: string;

  @property({
    type: 'string',
  })
  amount: string;

  @property({
    type: 'string',
  })
  amountIn: string;

  @property({
    type: 'string',
  })
  amountOut: string;

  @property({
    type: 'array',
    itemType: 'string',
    itemLength: 2,
  })
  tokenPath?: string[];

  @property({
    type: 'object',
  })
  data?: object;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;

  constructor(data?: Partial<EventTransfer>) {
    super(data);
  }
}

export interface EventTransferRelations {
  // describe navigational properties here
}

export type EventTransferWithRelations = EventTransfer & EventTransferRelations;
