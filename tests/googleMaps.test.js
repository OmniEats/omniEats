require('@babel/polyfill');

const request = require('supertest');

const app = require('../Backend/server');
beforeAll(() => db.sync({force: true}));
afterAll(() => db.close());
describe('test google maps loads from /api/googleMaps', function () {
  test('post/api/googleMaps should send back data', done => {
    request(app)
      .post('/api/google')
      .send({
              latitude: 37.7749,
              longitude: -122.4194
            })
      .expect(200)
      .end((err, res) => {
        if(err) return done(err);
        else {
          expect(res.body).toBeTruthy();
          expect(res.body[1].name).toBe('Zuni Café');
          done();
        }
      });
  });
})
