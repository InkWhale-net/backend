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
import {Pools} from '../models';
import {PoolsSchemaRepository} from '../repositories';

class TestPoolController {
  constructor(
    @repository(PoolsSchemaRepository)
    public poolsSchemaRepository : PoolsSchemaRepository,
  ) {}

  @post('/pools-schemas')
  @response(200, {
    description: 'PoolsSchema model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pools)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pools, {
            title: 'NewPoolsSchema',
            exclude: ['_id'],
          }),
        },
      },
    })
    poolsSchema: Omit<Pools, '_id'>,
  ): Promise<Pools> {
    return this.poolsSchemaRepository.create(poolsSchema);
  }

  @get('/pools-schemas/count')
  @response(200, {
    description: 'PoolsSchema model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pools) where?: Where<Pools>,
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
          items: getModelSchemaRef(Pools, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pools) filter?: Filter<Pools>,
  ): Promise<Pools[]> {
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
          schema: getModelSchemaRef(Pools, {partial: true}),
        },
      },
    })
    poolsSchema: Pools,
    @param.where(Pools) where?: Where<Pools>,
  ): Promise<Count> {
    return this.poolsSchemaRepository.updateAll(poolsSchema, where);
  }

  @get('/pools-schemas/{id}')
  @response(200, {
    description: 'PoolsSchema model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pools, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pools, {exclude: 'where'}) filter?: FilterExcludingWhere<Pools>
  ): Promise<Pools> {
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
          schema: getModelSchemaRef(Pools, {partial: true}),
        },
      },
    })
    poolsSchema: Pools,
  ): Promise<void> {
    await this.poolsSchemaRepository.updateById(id, poolsSchema);
  }

  @put('/pools-schemas/{id}')
  @response(204, {
    description: 'PoolsSchema PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() poolsSchema: Pools,
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
