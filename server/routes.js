// import errors from './components/errors';
// import path from 'path';

module.exports = function(app) {

  app.use('/api/v1/users', require('./api/user/user.route'));
  // app.use('/api/accounts', require('./api/account'));

  // app.use('/auth', require('./auth').default);

  // // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);

  // All other routes should redirect to the index.html
  app.use('/', function (req, res) {
    res.render('index');
  });
};