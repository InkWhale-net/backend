import {ApplicationConfig, InkWhaleBeApplication} from './application';
import { createBindingFromClass } from '@loopback/core';
export * from './application';
import fs from "fs";
import dotenv from "dotenv";
import {CronJobMonitor} from "./cronjob/monitor";
dotenv.config();

export async function main(options: ApplicationConfig = {}) {
  const app = new InkWhaleBeApplication(options);
  const cronJobMonitor = createBindingFromClass(CronJobMonitor);
  app.add(cronJobMonitor);
  app.configure(cronJobMonitor.key);

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
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      protocol: 'https',
      key: fs.readFileSync(`${process.env.SSL_KEY}`),
      cert: fs.readFileSync(`${process.env.SSL_PEM}`),
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
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
        origin: '*',
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
