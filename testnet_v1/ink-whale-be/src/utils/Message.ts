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
    description: 'The input of getTokens function',
    required: true,
    content: {
        'application/json': {schema: ReqGetTokensSchema},
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
    },
};