'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    tasks = require('./controllers/tasks'),
    session = require('./controllers/session');

var auth = require('./middlewares/authorization');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);

  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  app.get('/api/tasks', auth.requiresLogin, tasks.all);
  app.post('/api/tasks', auth.requiresLogin, tasks.create);
  app.put('/api/tasks/:taskId', auth.requiresLogin, tasks.update);
  app.post('/api/tasks/:taskId/comments', auth.requiresLogin, tasks.createComment);
  app.del('/api/tasks/:taskId/comments/:commentId', auth.requiresLogin, auth.task.hasAuthorization, auth.comment.hasAuthorization, tasks.destroyComment);
  app.get('/api/tasks/:taskId', auth.requiresLogin, auth.task.hasAuthorization, tasks.show);
  app.del('/api/tasks/:taskId', auth.requiresLogin, auth.task.hasAuthorization, tasks.destroy);

  //Finish with setting up the taskId param
  app.param('taskId', tasks.task);
  //Finish with setting up the taskId param
  app.param('commentId', tasks.comment);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', auth.setUserCookie, index.index);
};
