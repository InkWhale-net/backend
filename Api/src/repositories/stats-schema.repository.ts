import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InkWhaleDbDataSource} from '../datasources';
import {Stats, StatsSchemaRelations} from '../models';

export class StatsSchemaRepository extends DefaultCrudRepository<
  Stats,
  typeof Stats.prototype._id,
  StatsSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(Stats, dataSource);
  }
}
