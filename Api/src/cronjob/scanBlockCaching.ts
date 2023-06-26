import {createClient, RedisClientType} from "redis";
import dotenv from "dotenv";
import * as mongoDB from "mongodb";
import {EventTransfer} from "../models";
import {randomAsNumber} from "@polkadot/util-crypto";
import {ApiPromise, WsProvider} from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
dotenv.config();

export const collections: { eventTransfer?: mongoDB.Collection } = {}
export async function connectToDatabase () {
    dotenv.config();
    const dbUrl:string = process.env.DB_URL ? process.env.DB_URL : `127.0.0.1:27017`;
    const dbEventTransferCollection:string = `EventTransfer`;
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbUrl);
    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_URL_NAME);
    const eventTransferCollection: mongoDB.Collection = db.collection(dbEventTransferCollection);
    collections.eventTransfer = eventTransferCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${eventTransferCollection.collectionName}`);
}

export class RedisCache {
    private readonly cache: RedisClientType;
    private ttl: number; // Time to Live

    constructor(ttl: number) {
        this.ttl = ttl;
        this.cache = createClient({
            url: process.env.REDIS_URL
        });
        this.cache.on("error", (error: any) => {
            console.error(`Redis Client Error: ${error}`);
        });
        this.cache.on("connect", () => {
            console.log(`Redis connection established`);
        });
    }

    async test() {
        await this.cache.connect();

        // TODO: Add events Data into cache
        for(let blockNumber = 0; blockNumber < 100; blockNumber++) {
            const eventData = {
                data: `blockNumberData_${blockNumber}`,
                createdTime: new Date().getTime(),
                updatedTime: new Date().getTime(),
            };
            await this.cache.set(`blockNumber_${blockNumber}`, JSON.stringify(eventData));

            if (collections?.eventTransfer) {
                const eventDataObject = await collections.eventTransfer.findOne({
                    blockNumber: blockNumber
                });
                if (eventDataObject) {
                    console.log({eventData: eventDataObject});
                } else {
                    await collections.eventTransfer.insertOne({
                        blockNumber: randomAsNumber(),
                        data: {
                            ...eventData,
                            name: `test`,
                            value: `test_${new Date().getTime()}`,
                        },
                        createdTime: new Date(),
                        updatedTime: new Date(),
                    });
                }
            }
        }

        let value = await this.cache.get(`blockNumber_${12}`);
        console.log({value: value});



        await this.cache.flushDb();

        value = await this.cache.get(`blockNumber_${17}`);
        console.log({value: value});

        await this.cache.disconnect();
    }
}

const provider = new WsProvider(process.env.PROVIDER);
let api = new ApiPromise({
    provider,
    rpc: jsonrpc,
    types: {
        ContractsPsp34Id: {
            _enum: {
                U8: "u8",
                U16: "u16",
                U32: "u32",
                U64: "u64",
                U128: "u128",
                Bytes: "Vec<u8>",
            },
        },
    },
});
api.on("connected", () => {
    api.isReady.then(() => {
        console.log("Smartnet AZERO Connected");
    });
});

api.on("ready", () => {
    console.log("Smartnet AZERO Ready");
    connectToDatabase().then(() => {
        const newCache = new RedisCache(5000);
        newCache.test().then();
    });
});

api.on("error", (err) => {
    console.log('error', err);
});
