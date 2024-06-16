import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InkWhaleDbDataSource} from '../datasources';
import {KycAddress, KycAddressSchemaRelations} from '../models';

export class KycAddressSchemaRepository extends DefaultCrudRepository<
  KycAddress,
  typeof KycAddress.prototype._id,
  KycAddressSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(KycAddress, dataSource);
  }
}
