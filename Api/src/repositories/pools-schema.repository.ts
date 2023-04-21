import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InkWhaleDbDataSource} from '../datasources';
import {Pools, PoolsSchemaRelations} from '../models';

export class PoolsSchemaRepository extends DefaultCrudRepository<
  Pools,
  typeof Pools.prototype._id,
  PoolsSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(Pools, dataSource);
  }
}
