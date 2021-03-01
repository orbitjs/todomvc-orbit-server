import type { Server } from 'http';
import supertest from 'supertest';

import { createServer } from './server';

describe('todo', () => {
  let server: Server;
  beforeEach((done) => {
    const { app, source } = createServer();
    server = app.listen(() => done());
    server.on('close', () => source.deactivate());
  });
  afterEach((done) => {
    server.close(() => done());
  });

  describe('empty', () => {
    test('findRecords', async () => {
      const response = await supertest(server).get('/todos');

      expect(response.body).toStrictEqual({ data: [] });
    });

    test('findRecord', async () => {
      const response = await supertest(server).get('/todos/abc');

      expect(response.status).toEqual(404);
    });
  });

  describe('with record', () => {
    let earthId: string;
    beforeEach(async () => {
      const {
        body: { data },
      } = await supertest(server)
        .post('/todos')
        .send({
          data: {
            type: 'todo',
            attributes: {
              title: 'abc',
              completed: false,
            },
          },
        });

      earthId = data.id;
    });

    test('findRecords', async () => {
      const response = await supertest(server).get('/todos');

      expect(response.body).toStrictEqual({
        data: [
          {
            type: 'todo',
            id: earthId,
            attributes: {
              title: 'abc',
              completed: false,
            },
          },
        ],
      });
    });

    test('findRecord', async () => {
      const response = await supertest(server).get(`/todos/${earthId}`);

      expect(response.body).toStrictEqual({
        data: {
          type: 'todo',
          id: earthId,
          attributes: {
            title: 'abc',
            completed: false,
          },
        },
      });
    });
  });
});
