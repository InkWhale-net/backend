import {Entity, model, property} from '@loopback/repository';

@model()
export class KycAddress extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'string',
  })
  clientId?: string;

  @property({
    type: 'string',
  })
  event?: string;

  @property({
    type: 'string',
  })
  recordId?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  refId?: string;

  @property({
    type: 'number',
  })
  submitCount?: Number;

  @property({
    type: 'string',
  })
  blockPassID?: string;

  @property({
    type: 'string',
  })
  inreviewDate?: string;

  @property({
    type: 'string',
  })
  waitingDate?: string;

  @property({
    type: 'string',
  })
  approvedDate?: string;

  constructor(data?: Partial<KycAddress>) {
    super(data);
  }
}

export interface KycAddressSchemaRelations {
  // describe navigational properties here
}

export type KycAddressSchemaWithRelations = KycAddress &
  KycAddressSchemaRelations;
