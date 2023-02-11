# InkWhale Backend

This repo contains the code for InkWhale backend.

## pool.js

The main purpose of this file is to cache smart contract data and save them to local database. The database will be used in api.js to provide the frontend with faster data access. Reading data directly from blockchain via rpc can be slow, this backend service can enhance user experience and appearance.

## api.js

To read more about api used in this repo, check [API Document](docs/apis.md)

## Run the script locally
- Make sure you have MongoDB and Node (v10.19.0 or later) installed
- Run **npm install** to install all required libraries
- Create .env file in the root folder
```
API_PORT = 3413
DB = "mongodb://127.0.0.1:27017/inkwhale-ink4"
PROVIDER = "wss://ws.test.azero.dev"
```
- Run **node api** to start API service
- Run **node pools** to start Pool Caching service
- Note: If you are running Frontend locally, you need to modify the .env of the frontend **REACT_APP_API_BASE_URL=http://localhost:3413**
