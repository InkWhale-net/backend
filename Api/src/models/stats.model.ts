import {Entity, model, property} from '@loopback/repository';

@model()
export class Stats extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'number',
  })
  tvlInAzero?: string;

  @property({
    type: 'number',
  })
  tvlInUSD?: string;

  @property({
    type: 'string',
  })
  azeroInUSD?: string;

  @property({
    type: 'number',
  })
  inw2InAzero?: number;
}
export interface StatsSchemaRelations {
  // describe navigational properties here
}

export type StatsSchemaWithRelations = Stats & StatsSchemaRelations;
