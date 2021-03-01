import { createServer } from './server';

const { app, source } = createServer();

const port = process.env['PORT'] ?? 3000;
const server = app.listen(port);
server.on('close', () => source.deactivate());
