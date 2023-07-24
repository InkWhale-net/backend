import {Entity, model, property} from '@loopback/repository';

@model()
export class Launchpads extends Entity {
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
  launchpadContract?: string;

  @property({
    type: 'string',
  })
  projectInfoUri?: string;

  @property({
    type: 'string',
  })
  tokenContract?: string;

  @property({
    type: 'date',
  })
  createdTime?: Date;

  @property({
    type: 'date',
  })
  updatedTime?: Date;


  constructor(data?: Partial<Launchpads>) {
    super(data);
  }
}

export interface LaunchpadsSchemaRelations {
  // describe navigational properties here
}

export type LaunchpadsSchemaWithRelations = Launchpads & LaunchpadsSchemaRelations;
