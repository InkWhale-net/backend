import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InkWhaleDbDataSource} from '../datasources';
import {NftPoolsSchema, NftPoolsSchemaRelations} from '../models';

export class NftPoolsSchemaRepository extends DefaultCrudRepository<
  NftPoolsSchema,
  typeof NftPoolsSchema.prototype.id,
  NftPoolsSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(NftPoolsSchema, dataSource);
  }
}
