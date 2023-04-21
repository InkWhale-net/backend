import {ApplicationConfig, InkWhaleBeApplication} from './application';
import { createBindingFromClass } from '@loopback/core';
export * from './application';
import dotenv from "dotenv";
import {CronJobUpdatePools} from "./cronjob/PoolsJob";
dotenv.config();

export async function main(options: ApplicationConfig = {}) {
  const app = new InkWhaleBeApplication(options);
  const cronJobPool = createBindingFromClass(CronJobUpdatePools);
  app.add(cronJobPool);
  app.configure(cronJobPool.key);

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

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
