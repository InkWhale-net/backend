import {SchemaObject} from "@loopback/rest";

export type ResponseBody = {
    status: string,
    message: string,
    errorCode?: string,
    ret?: any,
    data?: object,
}

// UPDATE
export type ReqUpdateType = {
    type: string,
    poolContract: string
};
const ReqUpdateSchema: SchemaObject = {
    type: 'object',
    required: ['type', 'poolContract'],
    properties: {
        type: {
            type: 'string',
        },
        poolContract: {
            type: 'string',
        },
    },
};
export const RequestUpdateBody = {
    description: 'The input of update function',
    required: true,
    content: {
        'application/json': {schema: ReqUpdateSchema},
        'application/x-www-form-urlencoded': {schema: ReqUpdateSchema},
    },
};

// GET TOKENS
export type ReqGetTokensType = {
    limit?: number,
    offset?: number,
    sort?: number,
}
const ReqGetTokensSchema: SchemaObject = {
    type: 'object',
    properties: {
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};

export const RequestGetTokensBody = {
    description: 'The input of getToken function',
    required: true,
    content: {
        'application/json': {schema: ReqGetTokensSchema},
        'application/x-www-form-urlencoded': {schema: ReqGetTokensSchema},
    },
};

export type ReqGetTokenType = {
    tokenAddress: string,
}

const ReqGetTokenSchema: SchemaObject = {
    type: 'object',
    properties: {
      tokenAddress: {
        type: 'string',
      },
    },
  };

export const RequestGetTokenBody = {
    description: 'The input of getTokens function',
    required: true,
    content: {
        'application/json': {schema: ReqGetTokenSchema},
        'application/x-www-form-urlencoded': {schema: ReqGetTokenSchema},
    },
};

// UPDATE TOKEN ICON
export type ReqUpdateTokenIconType = {
    contractAddress?: string,
    tokenIconUrl?: string,
    tokenGeneratorContractAddress?: string
}
export type ReqImportToken = {
    tokenAddress?: string,
    tokenIconUrl?: string,
    tokenGeneratorContractAddress?: string,
    name?: string,
    symbol?: string,
    decimal?: number,
    creator?: string,
    signature?: string,
    isNew?: boolean
}

export type ReqAddKycAddress = {
  clientId?: string;
  event?: string;
  recordId?: string;
  status?: string;
  refId?: string;
  submitCount?: number;
  blockPassID?: string;
  inreviewDate?: string;
  waitingDate?: string;
  approvedDate?: string;
};

const ReqUpdateTokenIconSchema: SchemaObject = {
    type: 'object',
    properties: {
        contractAddress: {
            type: 'string',
        },
        tokenIconUrl: {
            type: 'string',
        },
        tokenGeneratorContractAddress: {
            type: 'string',
        },
    },
};
const ReqImportTokenSchema: SchemaObject = {
    type: 'object',
    properties: {
        tokenAddress: {
            type: 'string',
        },
        tokenIconUrl: {
            type: 'string',
        },
        tokenGeneratorContractAddress: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        symbol: {
            type: 'string',
        },
        decimal: {
            type: 'number',
        },
        creator: {
            type: 'string',
        },
        signature: {
            type: 'string',
        },
        isNew: {
            type: 'boolean'
        }
    },
};
const ReqAddKycAddressSchema: SchemaObject = {
  type: 'object',
  properties: {
    clientId: {
      type: 'string',
    },
    event: {
      type: 'string',
    },
    recordId: {
      type: 'string',
    },
    status: {
      type: 'string',
    },
    refId: {
      type: 'string',
    },
    submitCount: {
      type: 'number',
    },
    blockPassID: {
      type: 'string',
    },
    inreviewDate: {
      type: 'string',
    },
    waitingDate: {
      type: 'string',
    },
    approvedDate: {
      type: 'string',
    },
  },
};
export const ReqUpdateTokenIconBody = {
    description: 'The input of getTokens function',
    required: true,
    content: {
        'application/json': {schema: ReqUpdateTokenIconSchema},
        'application/x-www-form-urlencoded': {schema: ReqUpdateTokenIconSchema},
    },
};

export const ReqImportTokenBody = {
    description: 'The input of importToken function',
    required: true,
    content: {
        'application/json': {schema: ReqImportTokenSchema},
        'application/x-www-form-urlencoded': {schema: ReqImportTokenSchema},
    },
};

export const ReqAddKycAddressBody = {
  description: 'The input of addKycAddress function',
  required: true,
  content: {
    'application/json': {schema: ReqAddKycAddressSchema},
    'application/x-www-form-urlencoded': {schema: ReqAddKycAddressSchema},
  },
};

// GET LP POOLS
export type ReqGetLpPoolsType = {
    limit?: number,
    offset?: number,
    sort?: number,
    showZeroPool?: string,
}
const ReqGetLpPoolsSchema: SchemaObject = {
    type: 'object',
    properties: {
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
        showZeroPool: {
            type: 'string',
        },
    },
};
export const RequestGetLpPoolsBody = {
    description: 'The input of getLPPools function',
    required: true,
    content: {
        'application/json': {schema: ReqGetLpPoolsSchema},
        'application/x-www-form-urlencoded': {schema: ReqGetLpPoolsSchema},
    },
};

// GET LP POOLS BY ADDRESS
export type ReqGetLpPoolsByAddressType = {
    poolContract?: string
};
const ReqGetLpPoolsByAddressSchema: SchemaObject = {
    type: 'object',
    required: ['poolContract'],
    properties: {
        poolContract: {
            type: 'string',
        },
    },
};
export const RequestLpPoolsByAddressBody = {
    description: 'The input of getLPPoolByAddress function',
    required: true,
    content: {
        'application/json': {schema: ReqGetLpPoolsByAddressSchema},
        'application/x-www-form-urlencoded': {schema: ReqGetLpPoolsByAddressSchema},
    },
};

// GET LP POOLS BY OWNER
export type ReqGetLpPoolsByOwnerType = {
    owner?: string
};
const ReqGetLpPoolsByOwnerSchema: SchemaObject = {
    type: 'object',
    required: ['owner'],
    properties: {
        owner: {
            type: 'string',
        },
    },
};
export const RequestLpPoolsByOwnerBody = {
    description: 'The input of getLPPoolByOwner function',
    required: true,
    content: {
        'application/json': {schema: ReqGetLpPoolsByOwnerSchema},
        'application/x-www-form-urlencoded': {schema: ReqGetLpPoolsByOwnerSchema},
    },
};

// GET POOLS
export type ReqGetPoolsType = {
    limit?: number,
    offset?: number,
    sort?: number,
    showZeroPool?: string,
};
const ReqGetPoolsSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
        showZeroPool: {
            type: 'string',
        },
    },
};
export const RequestPoolsBody = {
    description: 'The input of getPools function',
    required: true,
    content: {
        'application/json': {schema: ReqGetPoolsSchema},
        'application/x-www-form-urlencoded': {schema: ReqGetPoolsSchema},
    },
};

// GET POOLS BY ADDRESS
export type ReqGetPoolsByAddressType = {
    poolContract?: string
};
const ReqGetPoolsByAddressSchema: SchemaObject = {
    type: 'object',
    required: ['poolContract'],
    properties: {
        poolContract: {
            type: 'string',
        }
    },
};
export const RequestGetPoolsByAddressBody = {
    description: 'The input of getPoolByAddress function',
    required: true,
    content: {
        'application/json': {schema: ReqGetPoolsByAddressSchema},
        'application/x-www-form-urlencoded': {schema: ReqGetPoolsByAddressSchema},
    },
};

// GET POOLS BY OWNER
export type ReqGetPoolsByOwnerType = {
    owner?: string
};
const ReqGetPoolsByOwnerSchema: SchemaObject = {
    type: 'object',
    required: ['owner'],
    properties: {
        owner: {
            type: 'string',
        },
    },
};
export const RequestGetPoolsByOwnerBody = {
    description: 'The input of getPoolByOwner function',
    required: true,
    content: {
        'application/json': {schema: ReqGetPoolsByOwnerSchema},
        'application/x-www-form-urlencoded': {schema: ReqGetPoolsByOwnerSchema},
    },
};

// GET NFT POOLS
export type ReqGetNftPoolsType = {
    limit?: number,
    offset?: number,
    sort?: number,
    showZeroPool?: string,
};
const ReqGetNftPoolsSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
        showZeroPool: {
            type: 'string',
        },
    },
};
export const RequestGetNftPoolsBody = {
    description: 'The input of getNFTPools function',
    required: true,
    content: {
        'application/json': {schema: ReqGetNftPoolsSchema},
        'application/x-www-form-urlencoded': {schema: ReqGetNftPoolsSchema},
    },
};

// GET NFT POOLS BY ADDRESS
export type ReqGetNftPoolsByAddressType = {
    poolContract?: string
};
const ReqGetNftPoolsByAddressSchema: SchemaObject = {
    type: 'object',
    required: ['poolContract'],
    properties: {
        poolContract: {
            type: 'string',
        }
    },
};
export const RequestGetNftPoolsByAddressBody = {
    description: 'The input of getNFTPoolByAddress function',
    required: true,
    content: {
        'application/json': {schema: ReqGetNftPoolsByAddressSchema},
        'application/x-www-form-urlencoded': {schema: ReqGetNftPoolsByAddressSchema},
    },
};

// GET NFT POOLS BY OWNER
export type ReqGetNftPoolsByOwnerType = {
    owner?: string
};
const ReqGetNftPoolsByOwnerSchema: SchemaObject = {
    type: 'object',
    required: ['owner'],
    properties: {
        owner: {
            type: 'string',
        },
    },
};
export const RequestGetNftPoolsByOwnerBody = {
    description: 'The input of getNFTPoolByOwner function',
    required: true,
    content: {
        'application/json': {schema: ReqGetNftPoolsByOwnerSchema},
        'application/x-www-form-urlencoded': {schema: ReqGetNftPoolsByOwnerSchema},
    },
};

// GET HISTORY TRANSFER BY USER
export type ReqGetTransactionHistoryType = {
    tokenContract?: string,
    queryAddress?: string,
    limit?: number,
    offset?: number,
    sort?: Boolean,
    isFromOnly: Boolean,
    isToOnly: Boolean
};
const ReqGetTransactionHistorySchema: SchemaObject = {
  type: 'object',
  required: ['tokenContract'],
  properties: {
    tokenContract: {
      type: 'string',
    },
    queryAddress: {
      type: 'string',
    },
    limit: {
      type: 'number',
    },
    offset: {
      type: 'number',
    },
    sort: {
      type: 'boolean',
    },
    isFromOnly: {
      type: 'boolean',
    },
    isToOnly: {
      type: 'boolean',
    },
  },
};
export const RequestGetTransactionHistoryBody = {
    description: 'The input of getTransactionHistory function',
    required: true,
    content: {
        'application/json': {schema: ReqGetTransactionHistorySchema},
        'application/x-www-form-urlencoded': {schema: ReqGetTransactionHistorySchema},
    },
};

// GET Launchpads
export type ReqGetLaunchpadsType = {
    keyword?: string,
    isActive: number,
    limit?: number,
    offset?: number,
    sort?: number,
};
const ReqGetLaunchpadsSchema: SchemaObject = {
    type: 'object',
    required: [],
    properties: {
        limit: {
            type: 'number',
        },
        isActive: {
            type: 'number'
        },
        offset: {
            type: 'number',
        },
        sort: {
            type: 'number',
        },
    },
};
export const RequestLaunchpadsBody = {
    description: 'The input of getPools function',
    required: true,
    content: {
        'application/json': {schema: ReqGetLaunchpadsSchema},
        'application/x-www-form-urlencoded': {schema: ReqGetLaunchpadsSchema},
    },
};


// GET LAUNCHPAD BY ADDRESS
export type ReqGetLaunchpadsByAddressType = {
    launchpadContract: string,
    keyword: string
};
const ReqGetLaunchpadsByAddressSchema: SchemaObject = {
    type: 'object',
    required: ['launchpadContract'],
    properties: {
        launchpadContract: {
            type: 'string',
        }
    },
};
export const RequestGetLaunchpadsByAddressBody = {
    description: 'The input of getLaunchpadByAddress function',
    required: true,
    content: {
        'application/json': {schema: ReqGetLaunchpadsByAddressSchema},
        'application/x-www-form-urlencoded': {schema: ReqGetLaunchpadsByAddressSchema},
    },
};
