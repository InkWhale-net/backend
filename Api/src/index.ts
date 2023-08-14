import {ApplicationConfig, InkWhaleBeApplication} from './application';
import { createBindingFromClass } from '@loopback/core';
export * from './application';
import dotenv from "dotenv";
import {CronJobUpdatePools} from "./cronjob/PoolsJob";
import {CronJobUpdateAllPools} from "./cronjob/ScanAllJob";
import {ApiPromise, WsProvider} from "@polkadot/api";
import jsonrpc from "@polkadot/types/interfaces/jsonrpc";
import {global_vars, SOCKET_STATUS} from "./cronjob/global";
import { CronJobUpdateStats } from './cronjob/StatsJob';
dotenv.config();

export let globalApi: ApiPromise;

export async function main(options: ApplicationConfig = {}) {
  const app = new InkWhaleBeApplication(options);
  const cronJobPool = createBindingFromClass(CronJobUpdatePools);
  app.add(cronJobPool);
  app.configure(cronJobPool.key);

  const cronJobUpdateAllPools = createBindingFromClass(CronJobUpdateAllPools);
  app.add(cronJobUpdateAllPools);
  app.configure(cronJobUpdateAllPools.key);

  const cronJobUpdateStats = createBindingFromClass(CronJobUpdateStats);
  app.add(cronJobUpdateStats);
  app.configure(cronJobUpdateStats.key);


  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  try {
    const provider = new WsProvider(process.env.PROVIDER);
    globalApi = new ApiPromise({
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
    globalApi.on("connected", () => {
      globalApi.isReady.then((api) => {
        console.log(`Global RPC Connected: ${process.env.PROVIDER}`);
        global_vars.socketStatus = SOCKET_STATUS.CONNECTED;
      });
    });
    globalApi.on("ready", async () => {
      console.log("Global RPC Ready");
      global_vars.socketStatus = SOCKET_STATUS.READY;
    });
    globalApi.on("error", (err) => {
      console.log('error', err );
      global_vars.socketStatus = SOCKET_STATUS.ERROR;
    });
  } catch (e) {
    console.log(`API GLOBAL - ERROR: ${e.message}`);
  }

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3007),
      host: process.env.HOST,
      protocol: 'http',
      requestBodyParser: {json: {limit: '1MB'}},
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
        disabled: true
      },
      apiExplorer: {
        disabled: true,
      },
      cors: {
        origin: (process.env.CORS_ORIGIN) ? process.env.CORS_ORIGIN : '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 86400,
        credentials: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
