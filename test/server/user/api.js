'use strict';

var should = require('should'),
    app = require('../../../server'),
    request = require('supertest');

var cookie = cookie || false;

describe('User controller', function() {
  it('should signup POST /signup', function(done) {
    request(app)
    .post('/api/users')
    .send({ email: 'user@gluck.com', password:'password' })
    .end(function(err,res){
      res.should.have.status(200);
      done();
    });

  });

  it('should not signup repeat email', function(done) {
    request(app)
    .post('/api/users')
    .send({ email: 'user@gluck.com', password:'password' })
    .end(function(err,res){
      res.should.have.status(400);
      if (err) return done(err);
      res.body.should.have.property('errors');
      var error = res.body.errors;
      error.should.have.keys('email');
      done();
    });

  });

  it('should signin', function(done) {
    request(app)
    .post('/api/session')
    .send({ email: 'user@gluck.com', password:'password' })
    .end(function(err, res) {
      res.should.have.status(200);
      if (err) return done(err);
      res.body.should.have.property('id');
      cookie = res.headers['set-cookie'];
      done();
    });
  });
});
