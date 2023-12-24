import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EventTele, EventTeleRelations} from '../models';
import {InkWhaleDbDataSource} from "../datasources";

export class EventTeleRepository extends DefaultCrudRepository<
  EventTele,
  typeof EventTele.prototype._id,
  EventTeleRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(EventTele, dataSource);
  }
}
