import {Entity, model, property} from '@loopback/repository';

@model()
export class EventTele extends Entity {
  @property({
    type: 'string',
    id: true,
    length: 100,
  })
  _id?: string;

  @property({
    type: 'string',
    index: {
      unique: true,
    },
  })
  uniqueIndex: string;

  @property({
    type: 'number',
    required: true,
  })
  blockNumber: number;

  @property({
    type: 'number',
    required: true,
  })
  eventName: number;

  @property({
    type: 'string',
    required: true,
  })
  tokenContract: string;

  @property({
    type: 'string',
    required: true,
  })
  tokenID: string;

  @property({
    type: 'string',
    required: true,
  })
  from: string;

  @property({
    type: 'string',
    required: true,
  })
  amount: string;

  @property({
    type: 'string',
    required: true,
  })
  stakeContract: string;

  @property({
    type: 'string',
    required: true,
  })
  earnContract: string;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;


  constructor(data?: Partial<EventTele>) {
    super(data);
  }
}

export interface EventTeleRelations {
  // describe navigational properties here
}

export type EventTeleWithRelations = EventTele & EventTeleRelations;
