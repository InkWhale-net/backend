import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InkWhaleDbDataSource} from '../datasources';
import {UpdateQueue, UpdateQueueSchemaRelations} from '../models';

export class UpdateQueueSchemaRepository extends DefaultCrudRepository<
  UpdateQueue,
  typeof UpdateQueue.prototype.id,
  UpdateQueueSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(UpdateQueue, dataSource);
  }
}
