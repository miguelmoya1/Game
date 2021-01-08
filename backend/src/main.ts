import 'reflect-metadata';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import * as bodyParser from 'body-parser';
import { INestApplication } from '@nestjs/common';
import {
  ROUTE_PRIVKEY,
  ROUTE_CERT,
  MAX_SIZE_JSON,
  PORT,
} from './app.constants';
import { AllExceptionsFilter } from './shared/exceptions/all-exceptions.filter';

async function bootstrap() {
  let app: INestApplication;

  try {
    const keyFile = readFileSync(ROUTE_PRIVKEY);
    const certFile = readFileSync(ROUTE_CERT);
    app = await NestFactory.create(AppModule, {
      httpsOptions: {
        key: keyFile,
        cert: certFile,
      },
      logger: false,
    });
  } catch (e) {
    app = await NestFactory.create(AppModule);
  }

  app.use(bodyParser.json({ limit: MAX_SIZE_JSON }));
  app.use(bodyParser.urlencoded({ limit: MAX_SIZE_JSON, extended: true }));
  app.enableCors();

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(PORT);
}
bootstrap();
