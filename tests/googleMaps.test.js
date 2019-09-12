require('@babel/polyfill');

const request = require('supertest');

const app = require('../Backend/server');

describe('test google maps loads from /api/googleMaps', function () {
  test('post/api/googleMaps should send back data', done => {
    request(app)
      .post('/api/googleMaps')
      .expect(200)
      .end((err, { body }) => {
        if(err) {
          done(err);
        } else {
          expect(body).toBeTruthy();
          done();
        }
      });
  });
})
