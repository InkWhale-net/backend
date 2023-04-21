import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InkWhaleDbDataSource} from '../datasources';
import {LpPoolsSchema, LpPoolsSchemaRelations} from '../models';

export class LpPoolsSchemaRepository extends DefaultCrudRepository<
  LpPoolsSchema,
  typeof LpPoolsSchema.prototype.id,
  LpPoolsSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(LpPoolsSchema, dataSource);
  }
}
