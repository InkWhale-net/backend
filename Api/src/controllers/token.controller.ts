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

class TokenController {
  constructor(
    @repository(TokensSchemaRepository)
    public tokensSchemaRepository : TokensSchemaRepository,
  ) {}

  @post('/tokens')
  @response(200, {
    description: 'Tokens model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tokens)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tokens, {
            title: 'NewTokens',
            exclude: ['_id'],
          }),
        },
      },
    })
    tokens: Omit<Tokens, '_id'>,
  ): Promise<Tokens> {
    return this.tokensSchemaRepository.create(tokens);
  }

  @get('/tokens/count')
  @response(200, {
    description: 'Tokens model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tokens) where?: Where<Tokens>,
  ): Promise<Count> {
    return this.tokensSchemaRepository.count(where);
  }

  @get('/tokens')
  @response(200, {
    description: 'Array of Tokens model instances',
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

  @patch('/tokens')
  @response(200, {
    description: 'Tokens PATCH success count',
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
    tokens: Tokens,
    @param.where(Tokens) where?: Where<Tokens>,
  ): Promise<Count> {
    return this.tokensSchemaRepository.updateAll(tokens, where);
  }

  @get('/tokens/{id}')
  @response(200, {
    description: 'Tokens model instance',
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

  @patch('/tokens/{id}')
  @response(204, {
    description: 'Tokens PATCH success',
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
    tokens: Tokens,
  ): Promise<void> {
    await this.tokensSchemaRepository.updateById(id, tokens);
  }

  @put('/tokens/{id}')
  @response(204, {
    description: 'Tokens PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tokens: Tokens,
  ): Promise<void> {
    await this.tokensSchemaRepository.replaceById(id, tokens);
  }

  @del('/tokens/{id}')
  @response(204, {
    description: 'Tokens DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tokensSchemaRepository.deleteById(id);
  }
}
