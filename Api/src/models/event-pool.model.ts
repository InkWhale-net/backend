import {Entity, model, property} from '@loopback/repository';

@model()
export class EventPool extends Entity {
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
    type: 'string',
  })
  eventName?: string;

  @property({
    type: 'string',
  })
  callerAddress?: string;

  @property({
    type: 'string',
  })
  poolAddress?: string;

  @property({
    type: 'string',
  })
  tokenAddress?: string;

  @property({
    type: 'string',
  })
  nftContractAddress?: string;

  @property({
    type: 'string',
  })
  nftTokenId?: string;

  @property({
    type: 'string',
  })
  amount?: string;

  @property({
    type: 'boolean',
  })
  isNft?: boolean;

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


  constructor(data?: Partial<EventPool>) {
    super(data);
  }
}

export interface EventPoolRelations {
  // describe navigational properties here
}

export type EventPoolWithRelations = EventPool & EventPoolRelations;
