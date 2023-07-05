# Models

This directory contains code for models provided by this app.

# Index
## poolsSchemaRepository
### Model:
- Pools
### Command line:
- db.Pools.createIndex( { "poolContract": 1, "tokenContract": 1, "tokenName": 1, "tokenSymbol": 1, "tokenDecimal": 1, "duration": 1, "startTime": 1, "tokenTotalSupply": 1, "rewardPool": 1, "totalStaked": 1, "maxStakingAmount": 1, "apy": 1, "maxStakingAmount": 1, "owner": 1  }, { unique: true } )
### Keys:
- poolContract
- tokenContract
- tokenName
- tokenSymbol
- tokenDecimal
- duration
- startTime
- tokenTotalSupply
- rewardPool
- totalStaked
- maxStakingAmount
- apy
- maxStakingAmount
- owner

## updateQueueSchemaRepository
### Model:
- UpdateQueue
### Command line:
- db.UpdateQueue.createIndex( { "requestType": 1, "poolContract": 1, "timeStamp": 1 }, { unique: true } )
### Keys:
- requestType
- poolContract
- timeStamp

## tokensSchemaRepository
### Model:
- Tokens
### Command line:
- db.Tokens.createIndex( { "contractAddress": 1, "name": 1, "symbol": 1, "decimal": 1, "creator": 1, "mintTo": 1, "totalSupply": 1, "index": 1 }, { unique: true } )
### Keys:
- contractAddress
- name
- symbol
- decimal
- creator
- mintTo
- totalSupply
- index

## nftPoolsSchemaRepository
### Model:
- NftPools
### Command line:
- db.NftPools.createIndex( { "poolContract": 1, "tokenContract": 1, "tokenName": 1, "tokenSymbol": 1, "tokenDecimal": 1, "duration": 1, "startTime": 1, "tokenTotalSupply": 1, "rewardPool": 1, "totalStaked": 1, "maxStakingAmount": 1, "multiplier": 1 }, { unique: true } )
### Keys:
- poolContract
- tokenContract
- tokenName
- tokenSymbol
- tokenDecimal
- duration
- startTime
- tokenTotalSupply
- rewardPool
- totalStaked
- maxStakingAmount
- multiplier

## lpPoolsSchemaRepository
### Model:
- LpPools
### Command line:
- db.LpPools.createIndex( { "poolContract": 1, "lptokenContract": 1, "lptokenName": 1, "lptokenSymbol": 1, "lptokenDecimal": 1, "tokenContract": 1, "tokenName": 1, "tokenSymbol": 1, "tokenDecimal": 1, "duration": 1, "startTime": 1, "tokenTotalSupply": 1, "rewardPool": 1, "totalStaked": 1, "maxStakingAmount": 1, "multiplier": 1, "owner": 1 }, { unique: true } )
### Keys:
- poolContract
- lptokenContract
- lptokenName
- lptokenSymbol
- lptokenDecimal
- tokenContract
- tokenName
- tokenSymbol
- tokenDecimal
- duration
- startTime
- tokenTotalSupply
- rewardPool
- totalStaked
- maxStakingAmount
- multiplier
- owner

## EventTransferRepository
### Model:
- EventTransfer
### Command line:
- db.EventTransfer.createIndex( { "blockNumber": 1, "eventIndex": 1, "fromAddress": 1, "toAddress": 1, "tokenAddress": 1, "amount": 1, "data": 1 }, { unique: true } )
### Keys:
- blockNumber
- eventIndex
- fromAddress
- toAddress
- tokenAddress
- amount
- data