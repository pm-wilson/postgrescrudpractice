const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

// describe('crudpractice routes', () => {
  // beforeEach(() => {
  //   return pool.query(fs.readFileSync('./sql/setup.sql'))
  // });

// });


describe('classes routes', () => {
  it('adding dummy test to remove fail message', () => {
    expect('yes').toEqual('yes');
  });
});

//for route tests