import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InkWhaleDbDataSource} from '../datasources';
import {UpdateQueueSchema, UpdateQueueSchemaRelations} from '../models';

export class UpdateQueueSchemaRepository extends DefaultCrudRepository<
  UpdateQueueSchema,
  typeof UpdateQueueSchema.prototype.id,
  UpdateQueueSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(UpdateQueueSchema, dataSource);
  }
}
