import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InkWhaleDbDataSource} from '../datasources';
import {Launchpads, LaunchpadsSchemaRelations} from '../models';

export class LaunchpadsSchemaRepository extends DefaultCrudRepository<
  Launchpads,
  typeof Launchpads.prototype._id,
  LaunchpadsSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(Launchpads, dataSource);
  }
}
