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
import {PoolsSchema} from '../models';
import {PoolsSchemaRepository} from '../repositories';

class TestPoolController {
  constructor(
    @repository(PoolsSchemaRepository)
    public poolsSchemaRepository : PoolsSchemaRepository,
  ) {}

  @post('/pools-schemas')
  @response(200, {
    description: 'PoolsSchema model instance',
    content: {'application/json': {schema: getModelSchemaRef(PoolsSchema)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PoolsSchema, {
            title: 'NewPoolsSchema',
            exclude: ['id'],
          }),
        },
      },
    })
    poolsSchema: Omit<PoolsSchema, 'id'>,
  ): Promise<PoolsSchema> {
    return this.poolsSchemaRepository.create(poolsSchema);
  }

  @get('/pools-schemas/count')
  @response(200, {
    description: 'PoolsSchema model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PoolsSchema) where?: Where<PoolsSchema>,
  ): Promise<Count> {
    return this.poolsSchemaRepository.count(where);
  }

  @get('/pools-schemas')
  @response(200, {
    description: 'Array of PoolsSchema model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PoolsSchema, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PoolsSchema) filter?: Filter<PoolsSchema>,
  ): Promise<PoolsSchema[]> {
    return this.poolsSchemaRepository.find(filter);
  }

  @patch('/pools-schemas')
  @response(200, {
    description: 'PoolsSchema PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PoolsSchema, {partial: true}),
        },
      },
    })
    poolsSchema: PoolsSchema,
    @param.where(PoolsSchema) where?: Where<PoolsSchema>,
  ): Promise<Count> {
    return this.poolsSchemaRepository.updateAll(poolsSchema, where);
  }

  @get('/pools-schemas/{id}')
  @response(200, {
    description: 'PoolsSchema model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PoolsSchema, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PoolsSchema, {exclude: 'where'}) filter?: FilterExcludingWhere<PoolsSchema>
  ): Promise<PoolsSchema> {
    return this.poolsSchemaRepository.findById(id, filter);
  }

  @patch('/pools-schemas/{id}')
  @response(204, {
    description: 'PoolsSchema PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PoolsSchema, {partial: true}),
        },
      },
    })
    poolsSchema: PoolsSchema,
  ): Promise<void> {
    await this.poolsSchemaRepository.updateById(id, poolsSchema);
  }

  @put('/pools-schemas/{id}')
  @response(204, {
    description: 'PoolsSchema PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() poolsSchema: PoolsSchema,
  ): Promise<void> {
    await this.poolsSchemaRepository.replaceById(id, poolsSchema);
  }

  @del('/pools-schemas/{id}')
  @response(204, {
    description: 'PoolsSchema DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.poolsSchemaRepository.deleteById(id);
  }
}
