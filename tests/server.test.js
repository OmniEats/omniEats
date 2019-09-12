require('@babel/polyfill');

const request = require('supertest')

const server = require('../Backend/server');
const { db } = require('../Backend/index')

beforeAll(() => db.sync());
afterAll(() => db.close());

describe('test route', function() {
  test('it should send back: someText!',
  done => {
    request(server)
      .get('/testing')
      .expect(200)
      .end((err, { text }) => {
        if (err) {
          done(err);
        } else {
          expect(text).toBeTruthy();
          expect(text).toBe('someText!');
          done();
        }
      });
  });
});
