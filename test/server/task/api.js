'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

var cookie = cookie || false;
var user;

describe('GET /api/tasks unauthorized', function() {

  it('should respond with 401', function(done) {
    request(app)
      .get('/api/tasks')
      .end(function(err, res) {
        res.should.have.status(401);
        done();
      });
  });


});

describe('GET /api/tasks', function() {

  // this.timeout(15000);

  var createAcountAndLogin = function( done ) {
    User.remove().exec();

    user = new User({
      provider: 'local',
      name: 'Fake User',
      email: 'test@test.com',
      password: 'password'
    });

    user.save(function() {
      request(app)
        .post('/api/session')
        .send({ email: 'test@test.com', password:'password' })
        .end(function(err, res) {
          cookie = res.headers['set-cookie'];
          done();
        });
    });
  };

  before(function( done ){
    createAcountAndLogin( done );
  });

  it('should respond with 200', function(done) {
    request(app)
      .get('/api/tasks')
      .set('cookie', cookie)
      .end(function(err,res) {
        res.should.have.status('200');
        done();
      });
  });


});
