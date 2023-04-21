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
import {Tokens} from '../models';
import {TokensSchemaRepository} from '../repositories';

class TestController {
  constructor(
    @repository(TokensSchemaRepository)
    public tokensSchemaRepository : TokensSchemaRepository,
  ) {}

  @post('/tokens-schemas')
  @response(200, {
    description: 'TokensSchema model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tokens)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tokens, {
            title: 'NewTokensSchema',
            exclude: ['id'],
          }),
        },
      },
    })
    tokensSchema: Omit<Tokens, 'id'>,
  ): Promise<Tokens> {
    return this.tokensSchemaRepository.create(tokensSchema);
  }

  @get('/tokens-schemas/count')
  @response(200, {
    description: 'TokensSchema model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tokens) where?: Where<Tokens>,
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
          items: getModelSchemaRef(Tokens, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tokens) filter?: Filter<Tokens>,
  ): Promise<Tokens[]> {
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
          schema: getModelSchemaRef(Tokens, {partial: true}),
        },
      },
    })
    tokensSchema: Tokens,
    @param.where(Tokens) where?: Where<Tokens>,
  ): Promise<Count> {
    return this.tokensSchemaRepository.updateAll(tokensSchema, where);
  }

  @get('/tokens-schemas/{id}')
  @response(200, {
    description: 'TokensSchema model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tokens, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tokens, {exclude: 'where'}) filter?: FilterExcludingWhere<Tokens>
  ): Promise<Tokens> {
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
          schema: getModelSchemaRef(Tokens, {partial: true}),
        },
      },
    })
    tokensSchema: Tokens,
  ): Promise<void> {
    await this.tokensSchemaRepository.updateById(id, tokensSchema);
  }

  @put('/tokens-schemas/{id}')
  @response(204, {
    description: 'TokensSchema PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tokensSchema: Tokens,
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
