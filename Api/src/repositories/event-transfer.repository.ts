import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EventTransfer, EventTransferRelations} from '../models';
import {InkWhaleDbDataSource} from "../datasources";

export class EventTransferRepository extends DefaultCrudRepository<
  EventTransfer,
  typeof EventTransfer.prototype._id,
  EventTransferRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(EventTransfer, dataSource);
  }
}