import {Entity, model, property} from '@loopback/repository';

@model()
export class UpdateQueue extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  // lp nft pool
  @property({
    type: 'string',
  })
  requestType?: string;

  @property({
    type: 'string',
  })
  poolContract?: string;

  @property({
    type: 'number',
  })
  timeStamp?: number;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;


  constructor(data?: Partial<UpdateQueue>) {
    super(data);
  }
}

export interface UpdateQueueSchemaRelations {
  // describe navigational properties here
}

export type UpdateQueueSchemaWithRelations = UpdateQueue & UpdateQueueSchemaRelations;
