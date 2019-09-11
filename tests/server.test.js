require('@babel/polyfill');

const request = require('supertest')

const server = require('../Backend/server');

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
          done();
        }
      });
  });
});
