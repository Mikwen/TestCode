const should = require('should');
const supertest = require('supertest');
const server = require('../app');

const app = supertest(server);

const helper = {
  app,
  should
};

module.exports = helper;

