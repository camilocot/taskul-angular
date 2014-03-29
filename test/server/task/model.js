'use strict';

var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Comment = mongoose.model('Comment'),
    Task = mongoose.model('Task');

var task, user, comment;

describe('Task Model', function() {
  before(function(done) {
    task = new Task({
      provider: 'local',
      title: 'Fake Title',
      content: 'Fake Content',
      comments: []
    });

    user = new User({
      provider: 'local',
      name: 'Fake User',
      email: 'test@test.com',
      password: 'password'
    });

    comment = new Comment({
      content: 'Content Comment'
    });

    // Clear users before testing
    User.remove().exec();
    user.save();
    done();
  });

  beforeEach(function(done) {
    Task.remove().exec();
    done();
  });

  after(function(done) {
    User.remove().exec();
    done();
  });

  it('should begin with no tasks', function(done) {
    Task.find({}, function(err, tasks) {
      tasks.should.have.length(0);
      done();
    });
  });

  it('should delete null comment when saving', function(done) {
    task.user = user;
    task.save();
    task.comments = [null, null];
    task.save(function(err, task) {
      should.exist(task);
      task.should.have.property('comments').with.lengthOf(0);
      done();
    });
  });

  it('should save comments', function (done) {
    comment.user = user;
    var ncomments = task.comments.length;

    task.comments.push(comment);
    task.save();
    task.save(function(err, task) {
      should.exist(task);
      task.should.have.property('comments').with.lengthOf(ncomments+1);
      done();
    });
  });


  it('should fail when saving without an title', function(done) {
    task.title = '';
    task.save(function(err) {
      should.exist(err);
      done();
    });
  });

});
