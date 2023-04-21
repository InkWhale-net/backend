import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TokensSchema} from '../models';
import {TokensSchemaRepository} from '../repositories';

class TestController {
  constructor(
    @repository(TokensSchemaRepository)
    public tokensSchemaRepository : TokensSchemaRepository,
  ) {}

  @post('/tokens-schemas')
  @response(200, {
    description: 'TokensSchema model instance',
    content: {'application/json': {schema: getModelSchemaRef(TokensSchema)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TokensSchema, {
            title: 'NewTokensSchema',
            exclude: ['id'],
          }),
        },
      },
    })
    tokensSchema: Omit<TokensSchema, 'id'>,
  ): Promise<TokensSchema> {
    return this.tokensSchemaRepository.create(tokensSchema);
  }

  @get('/tokens-schemas/count')
  @response(200, {
    description: 'TokensSchema model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TokensSchema) where?: Where<TokensSchema>,
  ): Promise<Count> {
    return this.tokensSchemaRepository.count(where);
  }

  @get('/tokens-schemas')
  @response(200, {
    description: 'Array of TokensSchema model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TokensSchema, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TokensSchema) filter?: Filter<TokensSchema>,
  ): Promise<TokensSchema[]> {
    return this.tokensSchemaRepository.find(filter);
  }

  @patch('/tokens-schemas')
  @response(200, {
    description: 'TokensSchema PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TokensSchema, {partial: true}),
        },
      },
    })
    tokensSchema: TokensSchema,
    @param.where(TokensSchema) where?: Where<TokensSchema>,
  ): Promise<Count> {
    return this.tokensSchemaRepository.updateAll(tokensSchema, where);
  }

  @get('/tokens-schemas/{id}')
  @response(200, {
    description: 'TokensSchema model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TokensSchema, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TokensSchema, {exclude: 'where'}) filter?: FilterExcludingWhere<TokensSchema>
  ): Promise<TokensSchema> {
    return this.tokensSchemaRepository.findById(id, filter);
  }

  @patch('/tokens-schemas/{id}')
  @response(204, {
    description: 'TokensSchema PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TokensSchema, {partial: true}),
        },
      },
    })
    tokensSchema: TokensSchema,
  ): Promise<void> {
    await this.tokensSchemaRepository.updateById(id, tokensSchema);
  }

  @put('/tokens-schemas/{id}')
  @response(204, {
    description: 'TokensSchema PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tokensSchema: TokensSchema,
  ): Promise<void> {
    await this.tokensSchemaRepository.replaceById(id, tokensSchema);
  }

  @del('/tokens-schemas/{id}')
  @response(204, {
    description: 'TokensSchema DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tokensSchemaRepository.deleteById(id);
  }
}
