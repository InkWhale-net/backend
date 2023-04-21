let mongoose = require('mongoose');
let database = require('./database.js');

const cors = require('cors') ;
const bodyParser = require('body-parser');
const express = require('express');

let fs = require('fs');

require('dotenv').config();

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minutes
	max: 1000, // Limit each IP to 60 requests per `window` (here, per 1 minute)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Apply the rate limiting middleware to all requests
app.use(limiter);

app.post('/update', async (req, res) => {

  if (!req.body) return res.send({"status": 'FAILED',"message":"No Input"});
  let poolContract = req.body.poolContract;
	let requestType = req.body.type;

	if (!poolContract) return res.send({"status": 'FAILED',"message":"Invalid poolContract"});
	let queue = await database.UpdateQueue.findOne({poolContract});
	if (queue) return res.send({"status": 'FAILED',"message":"exist"});

	let create_collection = await database.UpdateQueue.create({
		requestType,
		poolContract,
		timeStamp: new Date().getTime()
	});
	return res.send({"status": 'OK',ret:"added"});

});

app.post('/getTokens', async (req, res) => {

  if (!req.body) return res.send({"status": 'FAILED',"message":"No Input"});
  let limit = req.body.limit;
  let offset = req.body.offset;
  let sort = req.body.sort;
  if (!limit) limit = 100;
  if (!offset) offset = 0;
  if (!sort) sort = -1;

	let tokens = await database.Tokens.find().sort({"index":parseInt(sort)}).skip(parseInt(offset)).limit(parseInt(limit));

  return res.send({"status": 'OK',ret:tokens});

});

app.post('/getLPPools', async (req, res) => {

  if (!req.body) return res.send({"status": 'FAILED',"message":"No Input"});
  let limit = req.body.limit;
  let offset = req.body.offset;
  let sort = req.body.sort;
	let showZeroPool = req.body.showZeroPool;
  if (!limit) limit = 100;
  if (!offset) offset = 0;
  if (!sort) sort = -1;
	let pools = [];
	if (showZeroPool == "false")
		pools = await database.LPPools.find().where('rewardPool').gt(0).sort({"startTime":parseInt(sort)}).skip(parseInt(offset)).limit(parseInt(limit));
	else
		pools = await database.LPPools.find().sort({"startTime":parseInt(sort)}).skip(parseInt(offset)).limit(parseInt(limit));

  return res.send({"status": 'OK',ret:pools});

});

app.post('/getLPPoolByAddress', async (req, res) => {

  if (!req.body) return res.send({"status": 'FAILED',"message":"No Input"});
  let poolContract = req.body.poolContract;
  if (!poolContract) return res.send({"status": 'OK',ret:[]});

	let pool = await database.LPPools.find({poolContract});

  return res.send({"status": 'OK',ret:pool});

});

app.post('/getLPPoolByOwner', async (req, res) => {

  if (!req.body) return res.send({"status": 'FAILED',"message":"No Input"});
  let owner = req.body.owner;
  if (!owner) return res.send({"status": 'OK',ret:[]});

	let pool = await database.LPPools.find({owner});

  return res.send({"status": 'OK',ret:pool});

});

app.post('/getPools', async (req, res) => {

  if (!req.body) return res.send({"status": 'FAILED',"message":"No Input"});
  let limit = req.body.limit;
  let offset = req.body.offset;
  let sort = req.body.sort;
	let showZeroPool = req.body.showZeroPool;
  if (!limit) limit = 100;
  if (!offset) offset = 0;
  if (!sort) sort = -1;
	let pools = [];
	console.log('showZeroPool',showZeroPool);
	if (showZeroPool == "false")
		pools = await database.Pools.find().where('rewardPool').gt(0).sort({"startTime":parseInt(sort)}).skip(parseInt(offset)).limit(parseInt(limit));
	else
		pools = await database.Pools.find().sort({"startTime":parseInt(sort)}).skip(parseInt(offset)).limit(parseInt(limit));
  return res.send({"status": 'OK',ret:pools});

});

app.post('/getPoolByAddress', async (req, res) => {

  if (!req.body) return res.send({"status": 'FAILED',"message":"No Input"});
  let poolContract = req.body.poolContract;
  if (!poolContract) return res.send({"status": 'OK',ret:[]});

	let pool = await database.Pools.find({poolContract});

  return res.send({"status": 'OK',ret:pool});

});

app.post('/getPoolByOwner', async (req, res) => {

  if (!req.body) return res.send({"status": 'FAILED',"message":"No Input"});
  let owner = req.body.owner;
  if (!owner) return res.send({"status": 'OK',ret:[]});

	let pool = await database.Pools.find({owner});

  return res.send({"status": 'OK',ret:pool});

});

app.post('/getNFTPools', async (req, res) => {

  if (!req.body) return res.send({"status": 'FAILED',"message":"No Input"});
  let limit = req.body.limit;
  let offset = req.body.offset;
  let sort = req.body.sort;
	let showZeroPool = req.body.showZeroPool;
  if (!limit) limit = 100;
  if (!offset) offset = 0;
  if (!sort) sort = -1;
	let pools = [];
	if (showZeroPool == "false")
		pools = await database.NFTPools.find().where('rewardPool').gt(0).sort({"startTime":parseInt(sort)}).skip(parseInt(offset)).limit(parseInt(limit));
	else
		pools = await database.NFTPools.find().sort({"startTime":parseInt(sort)}).skip(parseInt(offset)).limit(parseInt(limit));

  return res.send({"status": 'OK',ret:pools});

});

app.post('/getNFTPoolByAddress', async (req, res) => {

  if (!req.body) return res.send({"status": 'FAILED',"message":"No Input"});
  let poolContract = req.body.poolContract;
  if (!poolContract) return res.send({"status": 'OK',ret:[]});

	let pool = await database.NFTPools.find({poolContract});

  return res.send({"status": 'OK',ret:pool});

});

app.post('/getNFTPoolByOwner', async (req, res) => {

  if (!req.body) return res.send({"status": 'FAILED',"message":"No Input"});
  let owner = req.body.owner;
  if (!owner) return res.send({"status": 'OK',ret:[]});

	let pool = await database.NFTPools.find({owner});

  return res.send({"status": 'OK',ret:pool});

});

const connectDb = () => {
  return mongoose.connect(process.env.DB, {useNewUrlParser: true});
};

connectDb().then(async () => { 
  app.listen(process.env.API_PORT, () => {
    console.log(`INKWHALE.NET API listening on ${process.env.API_PORT}!`);
  });
  
});
