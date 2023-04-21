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
import {LpPools} from '../models';
import {LpPoolsSchemaRepository} from '../repositories';

class TestRewardsPoolsController {
  constructor(
    @repository(LpPoolsSchemaRepository)
    public lpPoolsSchemaRepository : LpPoolsSchemaRepository,
  ) {}

  @post('/lp-pools-schemas')
  @response(200, {
    description: 'LpPoolsSchema model instance',
    content: {'application/json': {schema: getModelSchemaRef(LpPools)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LpPools, {
            title: 'NewLpPoolsSchema',
            exclude: ['_id'],
          }),
        },
      },
    })
    lpPoolsSchema: Omit<LpPools, '_id'>,
  ): Promise<LpPools> {
    return this.lpPoolsSchemaRepository.create(lpPoolsSchema);
  }

  @get('/lp-pools-schemas/count')
  @response(200, {
    description: 'LpPoolsSchema model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(LpPools) where?: Where<LpPools>,
  ): Promise<Count> {
    return this.lpPoolsSchemaRepository.count(where);
  }

  @get('/lp-pools-schemas')
  @response(200, {
    description: 'Array of LpPoolsSchema model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(LpPools, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(LpPools) filter?: Filter<LpPools>,
  ): Promise<LpPools[]> {
    return this.lpPoolsSchemaRepository.find(filter);
  }

  @patch('/lp-pools-schemas')
  @response(200, {
    description: 'LpPoolsSchema PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LpPools, {partial: true}),
        },
      },
    })
    lpPoolsSchema: LpPools,
    @param.where(LpPools) where?: Where<LpPools>,
  ): Promise<Count> {
    return this.lpPoolsSchemaRepository.updateAll(lpPoolsSchema, where);
  }

  @get('/lp-pools-schemas/{id}')
  @response(200, {
    description: 'LpPoolsSchema model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(LpPools, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(LpPools, {exclude: 'where'}) filter?: FilterExcludingWhere<LpPools>
  ): Promise<LpPools> {
    return this.lpPoolsSchemaRepository.findById(id, filter);
  }

  @patch('/lp-pools-schemas/{id}')
  @response(204, {
    description: 'LpPoolsSchema PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LpPools, {partial: true}),
        },
      },
    })
    lpPoolsSchema: LpPools,
  ): Promise<void> {
    await this.lpPoolsSchemaRepository.updateById(id, lpPoolsSchema);
  }

  @put('/lp-pools-schemas/{id}')
  @response(204, {
    description: 'LpPoolsSchema PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lpPoolsSchema: LpPools,
  ): Promise<void> {
    await this.lpPoolsSchemaRepository.replaceById(id, lpPoolsSchema);
  }

  @del('/lp-pools-schemas/{id}')
  @response(204, {
    description: 'LpPoolsSchema DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lpPoolsSchemaRepository.deleteById(id);
  }
}
