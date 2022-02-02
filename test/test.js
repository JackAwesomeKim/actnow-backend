var request = require('supertest');
var app = require('../index_test.js');
describe('GET /', function() {
 it('respond with hello world', function(done) {
  //navigate to root and check the response is "hello world"
  request(app).get('/').expect('hello world', done);
 });
});

