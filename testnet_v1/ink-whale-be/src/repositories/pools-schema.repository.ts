import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InkWhaleDbDataSource} from '../datasources';
import {PoolsSchema, PoolsSchemaRelations} from '../models';

export class PoolsSchemaRepository extends DefaultCrudRepository<
  PoolsSchema,
  typeof PoolsSchema.prototype.id,
  PoolsSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(PoolsSchema, dataSource);
  }
}
