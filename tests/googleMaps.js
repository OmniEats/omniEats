require('@babel/polyfill');

const request = require('supertest');

const app = require('../Backend/server');
const { db } = require('../Backend/index');

beforeAll(() => db.sync());
afterAll(() => db.close());

describe('test google maps loads from /api/googleMaps', function () {
  test('post/api/googleMaps should send back data', done => {
    request(app)
      .post('/api/google', {
        latitude: 37.7749,
        longitude: 122.4194
      })
      .expect(200)
      .end((err, { body }) => {
        if(err) {
          done(err);
        } else {
          expect(text).toBeTruthy();
          done();
        }
      });
  });
})
