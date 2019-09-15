require('@babel/polyfill');

const request = require('supertest');
const app = require('../Backend/server');
const { db, models } = require('../Backend/index');
const Resturant = require('../Backend/models/Restaurant');

beforeAll(() => db.sync({force: true}));

let testurant;
beforeEach(async () => {
  testurant = await Resturant.create({
    name: 'test resturant',
    googleId: 'testtesttest',
    latitude: 10.10,
    longitude: 33.33,
  });
});

afterEach(async () => {
  await testurant.destroy();
  testurant = null;
});

afterAll(() => db.close());

describe('database testing', () => {
  test('check if new entry is created in database', () => {
    const values = testurant.toJSON();
    // remove id from values b/c always unique
    const id = values.id;
    delete values.id;
    expect(values.name).toEqual('test resturant')
    expect(values.googleId).toEqual('testtesttest');
    // add id back to values & instance so destroy works
    values.id = id;
  });
});
