import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EventPool, EventPoolRelations} from '../models';
import {InkWhaleDbDataSource} from "../datasources";

export class EventPoolRepository extends DefaultCrudRepository<
  EventPool,
  typeof EventPool.prototype._id,
  EventPoolRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(EventPool, dataSource);
  }
}
