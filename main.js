'use strict';

const fastify = require('fastify');

const path = require('node:path');

const { Logger } = require('./src/logger.js');
const http = require('./src/http.js');
const ws = require('./src/ws.js');

const { loadApplication } = require('./src/loader.js');
const APPLICATION_PATH = path.join(process.cwd(), '../NodeJS-Application');

(async () => {
  const server = fastify({ logger: true });
  const logger = new Logger(server.log);

  const app = await loadApplication(APPLICATION_PATH, logger);

  http.init(server, app.api);
  http.initStatic(server, APPLICATION_PATH);
  ws.init(server, app.api);
  http.start(server, { port: app.config.server.ports[0] });
})();
