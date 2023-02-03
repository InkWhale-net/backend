import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InkWhaleDbDataSource} from '../datasources';
import {TokensSchema, TokensSchemaRelations} from '../models';

export class TokensSchemaRepository extends DefaultCrudRepository<
  TokensSchema,
  typeof TokensSchema.prototype.id,
  TokensSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(TokensSchema, dataSource);
  }
}
