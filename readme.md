# InkWhale Backend

This repo contains the code for InkWhale backend.

## pool.js

The main purpose of this file is to cache smart contract data and save them to local database. The database will be used in api.js to provide the frontend with faster data access. Reading data directly from blockchain via rpc can be slow, this backend service can enhance user experience and appearance.

## api.js

To read more about api used in this repo, check [API Document](docs/apis.md)
