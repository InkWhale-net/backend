let mongoose = require('mongoose');
const PoolsSchema = new mongoose.Schema({
  owner:  {
    type: String,
  },
  poolContract: {
    type: String,
  },
  tokenContract: {
    type: String,
  },
  tokenName: {
    type: String,
  },
  tokenSymbol: {
    type: String,
  },
  tokenDecimal: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  startTime: {
    type: Number,
  },
  tokenTotalSupply: {
    type: Number,
  },
  rewardPool: {
    type: Number,
  },
  totalStaked: {
    type: Number,
  },
  apy: {
    type: Number,
  }
});
const LPPoolsSchema = new mongoose.Schema({
  owner:  {
    type: String,
  },
  poolContract: {
    type: String,
  },
  lptokenContract: {
    type: String,
  },
  lptokenName: {
    type: String,
  },
  lptokenSymbol: {
    type: String,
  },
  lptokenDecimal: {
    type: Number,
  },
  tokenContract: {
    type: String,
  },
  tokenName: {
    type: String,
  },
  tokenSymbol: {
    type: String,
  },
  tokenDecimal: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  startTime: {
    type: Number,
  },
  tokenTotalSupply: {
    type: Number,
  },
  lptokenTotalSupply: {
    type: Number,
  },
  rewardPool: {
    type: Number,
  },
  totalStaked: {
    type: Number,
  },
  multiplier: {
    type: Number,
  }
});
const NFTPoolsSchema = new mongoose.Schema({
  owner:  {
    type: String,
  },
  poolContract: {
    type: String,
  },
  NFTtokenContract: {
    type: String,
  },
  tokenContract: {
    type: String,
  },
  tokenName: {
    type: String,
  },
  tokenSymbol: {
    type: String,
  },
  tokenDecimal: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  startTime: {
    type: Number,
  },
  tokenTotalSupply: {
    type: Number,
  },
  rewardPool: {
    type: Number,
  },
  totalStaked: {
    type: Number,
  },
  multiplier: {
    type: Number,
  }
});
const UpdateQueueSchema = new mongoose.Schema({
  requestType:  {
    type: String,   //lp nft pool
  },
  poolContract: {
    type: String,
  },
  timeStamp: {
    type: Number,
  }
});

const TokensSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  symbol: {
    type: String,
  },
  decimal: {
    type: Number,
  },
  contractAddress: {
    type: String,
  },
  creator: {
    type: String,
  },
  mintTo: {
    type: String,
  },
  totalSupply: {
    type: Number,
  },
  index: {
    type: Number,
  },
});
module.exports = {
  Pools:mongoose.model('Pools', PoolsSchema),
  NFTPools:mongoose.model('NFTPools', NFTPoolsSchema),
  LPPools:mongoose.model('LPPools', LPPoolsSchema),
  UpdateQueue:mongoose.model('UpdateQueue', UpdateQueueSchema),
  Tokens:mongoose.model('Tokens', TokensSchema),

};
