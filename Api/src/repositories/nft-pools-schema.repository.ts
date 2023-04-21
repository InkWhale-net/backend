import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InkWhaleDbDataSource} from '../datasources';
import {NftPools, NftPoolsSchemaRelations} from '../models';

export class NftPoolsSchemaRepository extends DefaultCrudRepository<
  NftPools,
  typeof NftPools.prototype._id,
  NftPoolsSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(NftPools, dataSource);
  }
}
