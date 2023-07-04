import {Entity, model, property} from '@loopback/repository';

@model()
export class ReScannedBlocks extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'boolean',
  })
  lastScanned?: boolean;

  @property({
    type: 'number',
  })
  blockNumber?: number;

  @property({
    type: 'object',
  })
  dataObject?: object;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;


  constructor(data?: Partial<ReScannedBlocks>) {
    super(data);
  }
}

export interface ReScannedBlocksSchemaRelations {
  // describe navigational properties here
}

export type ReScannedBlocksSchemaWithRelations = ReScannedBlocks & ReScannedBlocksSchemaRelations;
