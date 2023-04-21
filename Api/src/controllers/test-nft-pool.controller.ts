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
import {NftPools} from '../models';
import {NftPoolsSchemaRepository} from '../repositories';

class TestNftPoolController {
  constructor(
    @repository(NftPoolsSchemaRepository)
    public nftPoolsSchemaRepository : NftPoolsSchemaRepository,
  ) {}

  @post('/nft-pools-schemas')
  @response(200, {
    description: 'NftPoolsSchema model instance',
    content: {'application/json': {schema: getModelSchemaRef(NftPools)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NftPools, {
            title: 'NewNftPoolsSchema',
            exclude: ['_id'],
          }),
        },
      },
    })
    nftPoolsSchema: Omit<NftPools, '_id'>,
  ): Promise<NftPools> {
    return this.nftPoolsSchemaRepository.create(nftPoolsSchema);
  }

  @get('/nft-pools-schemas/count')
  @response(200, {
    description: 'NftPoolsSchema model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(NftPools) where?: Where<NftPools>,
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
          items: getModelSchemaRef(NftPools, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(NftPools) filter?: Filter<NftPools>,
  ): Promise<NftPools[]> {
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
          schema: getModelSchemaRef(NftPools, {partial: true}),
        },
      },
    })
    nftPoolsSchema: NftPools,
    @param.where(NftPools) where?: Where<NftPools>,
  ): Promise<Count> {
    return this.nftPoolsSchemaRepository.updateAll(nftPoolsSchema, where);
  }

  @get('/nft-pools-schemas/{id}')
  @response(200, {
    description: 'NftPoolsSchema model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(NftPools, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(NftPools, {exclude: 'where'}) filter?: FilterExcludingWhere<NftPools>
  ): Promise<NftPools> {
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
          schema: getModelSchemaRef(NftPools, {partial: true}),
        },
      },
    })
    nftPoolsSchema: NftPools,
  ): Promise<void> {
    await this.nftPoolsSchemaRepository.updateById(id, nftPoolsSchema);
  }

  @put('/nft-pools-schemas/{id}')
  @response(204, {
    description: 'NftPoolsSchema PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() nftPoolsSchema: NftPools,
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
