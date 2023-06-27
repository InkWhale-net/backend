import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ReScannedBlocks, ReScannedBlocksSchemaRelations} from '../models';
import {InkWhaleDbDataSource} from "../datasources";

export class ReScannedBlocksSchemaRepository extends DefaultCrudRepository<
  ReScannedBlocks,
  typeof ReScannedBlocks.prototype._id,
  ReScannedBlocksSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(ReScannedBlocks, dataSource);
  }
}
