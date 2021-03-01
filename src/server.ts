import type { Config } from 'knex';
import { RecordSchema, ModelDefinition, RecordSource } from '@orbit/records';
import Koa from 'koa';
import koaOrbit from 'koa-orbit';
import SQLSource from 'orbit-sql';

import schemaJson from './schema.json';
import * as config from './knexfile';

function loadConfig(): Config {
  const env = process.env.NODE_ENV || 'development';
  console.log(`Starting in "${env}" environment`);
  return (config as Record<string, Config>)[env];
}

export function createServer(): { app: Koa; source: RecordSource } {
  const app = new Koa();
  const schema = new RecordSchema({
    models: schemaJson.models as Record<string, ModelDefinition>,
  });

  const source = new SQLSource({
    schema,
    knex: loadConfig(),
  });

  const router = koaOrbit({
    source,
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  return { app, source };
}
