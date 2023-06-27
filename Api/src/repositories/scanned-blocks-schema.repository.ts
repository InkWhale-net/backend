import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ScannedBlocks, ScannedBlocksSchemaRelations} from '../models';
import {InkWhaleDbDataSource} from "../datasources";

export class ScannedBlocksSchemaRepository extends DefaultCrudRepository<
  ScannedBlocks,
  typeof ScannedBlocks.prototype._id,
  ScannedBlocksSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(ScannedBlocks, dataSource);
  }
}
