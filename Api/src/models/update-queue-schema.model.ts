import {Entity, model, property} from '@loopback/repository';

@model()
export class UpdateQueueSchema extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

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


  constructor(data?: Partial<UpdateQueueSchema>) {
    super(data);
  }
}

export interface UpdateQueueSchemaRelations {
  // describe navigational properties here
}

export type UpdateQueueSchemaWithRelations = UpdateQueueSchema & UpdateQueueSchemaRelations;
