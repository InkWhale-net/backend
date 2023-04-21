import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InkWhaleDbDataSource} from '../datasources';
import {LpPools, LpPoolsSchemaRelations} from '../models';

export class LpPoolsSchemaRepository extends DefaultCrudRepository<
  LpPools,
  typeof LpPools.prototype._id,
  LpPoolsSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(LpPools, dataSource);
  }
}
