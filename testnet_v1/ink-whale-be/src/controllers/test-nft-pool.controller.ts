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
import {NftPoolsSchema} from '../models';
import {NftPoolsSchemaRepository} from '../repositories';

class TestNftPoolController {
  constructor(
    @repository(NftPoolsSchemaRepository)
    public nftPoolsSchemaRepository : NftPoolsSchemaRepository,
  ) {}

  @post('/nft-pools-schemas')
  @response(200, {
    description: 'NftPoolsSchema model instance',
    content: {'application/json': {schema: getModelSchemaRef(NftPoolsSchema)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NftPoolsSchema, {
            title: 'NewNftPoolsSchema',
            exclude: ['id'],
          }),
        },
      },
    })
    nftPoolsSchema: Omit<NftPoolsSchema, 'id'>,
  ): Promise<NftPoolsSchema> {
    return this.nftPoolsSchemaRepository.create(nftPoolsSchema);
  }

  @get('/nft-pools-schemas/count')
  @response(200, {
    description: 'NftPoolsSchema model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(NftPoolsSchema) where?: Where<NftPoolsSchema>,
  ): Promise<Count> {
    return this.nftPoolsSchemaRepository.count(where);
  }

  @get('/nft-pools-schemas')
  @response(200, {
    description: 'Array of NftPoolsSchema model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(NftPoolsSchema, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(NftPoolsSchema) filter?: Filter<NftPoolsSchema>,
  ): Promise<NftPoolsSchema[]> {
    return this.nftPoolsSchemaRepository.find(filter);
  }

  @patch('/nft-pools-schemas')
  @response(200, {
    description: 'NftPoolsSchema PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NftPoolsSchema, {partial: true}),
        },
      },
    })
    nftPoolsSchema: NftPoolsSchema,
    @param.where(NftPoolsSchema) where?: Where<NftPoolsSchema>,
  ): Promise<Count> {
    return this.nftPoolsSchemaRepository.updateAll(nftPoolsSchema, where);
  }

  @get('/nft-pools-schemas/{id}')
  @response(200, {
    description: 'NftPoolsSchema model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(NftPoolsSchema, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(NftPoolsSchema, {exclude: 'where'}) filter?: FilterExcludingWhere<NftPoolsSchema>
  ): Promise<NftPoolsSchema> {
    return this.nftPoolsSchemaRepository.findById(id, filter);
  }

  @patch('/nft-pools-schemas/{id}')
  @response(204, {
    description: 'NftPoolsSchema PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NftPoolsSchema, {partial: true}),
        },
      },
    })
    nftPoolsSchema: NftPoolsSchema,
  ): Promise<void> {
    await this.nftPoolsSchemaRepository.updateById(id, nftPoolsSchema);
  }

  @put('/nft-pools-schemas/{id}')
  @response(204, {
    description: 'NftPoolsSchema PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() nftPoolsSchema: NftPoolsSchema,
  ): Promise<void> {
    await this.nftPoolsSchemaRepository.replaceById(id, nftPoolsSchema);
  }

  @del('/nft-pools-schemas/{id}')
  @response(204, {
    description: 'NftPoolsSchema DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.nftPoolsSchemaRepository.deleteById(id);
  }
}
