import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InkWhaleDbDataSource} from '../datasources';
import {Tokens, TokensSchemaRelations} from '../models';

export class TokensSchemaRepository extends DefaultCrudRepository<
  Tokens,
  typeof Tokens.prototype._id,
  TokensSchemaRelations
> {
  constructor(
    @inject('datasources.InkWhaleDB') dataSource: InkWhaleDbDataSource,
  ) {
    super(Tokens, dataSource);
  }
}
