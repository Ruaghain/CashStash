var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../../config/environment/index');
var logger = require('../../utils/logging').log;

var User = require('../user/user.model');

router.get('/test', function (req, res) {
  logger.info('We are in the test.');
  res.status(200).json({
    message: 'server is up - YEEEEOOOOOOWWWW!!'
  });
});

router.post('/signup', function (req, res, next) {
  logger.debug('Signing up new user: "%s"', req.body.userName);
  var user = new User({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function (err, result) {
    if (err) {
      logger.error('There was an error saving the new user: %s', err);
      //Need to return here because you want it to return immediately, and not execute
      //the last code - below this return statement.
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      })
    }
    logger.debug('New user was successfully saved.');
    //Don't need return here as it's the last statement.
    res.status(201).json({
      message: 'User created',
      obj: result
    })
  })
});

router.post('/signin', function (req, res, next) {
  logger.debug('Signing in user: "%s"', req.body.userName);
  User.findOne({ userName: req.body.userName }, function (err, user) {
    if (err) {
      logger.error('There was an error finding the user');
      return res.status(500).json({
        title: 'An error occurred finding the user.',
        error: err
      });
    }
    //Use this error message as it gives nothing away with regards to credentials.
    if (!user) {
      logger.error('User was not found.');
      return res.status(401).json({
        title: 'Login failed',
        error: { message: 'Invalid login credentials.' }
      });
    }

    if (!user.authenticate(req.body.password)) {
      logger.error('Could not authenticate passed in user.');
      return res.status(401).json({
        title: 'Login failed',
        error: { message: 'Invalid login credentials.' }
      });
    }

    var tokenObject = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    };

    logger.debug('Generating JWT token for user.');
    var token = jwt.sign({ user: tokenObject }, config.secrets.session, { expiresIn: 7200 });
    res.status(200).json({
      message: 'Successfully logged in.',
      token: token
    });

    logger.debug('Successfully logged in user.');
  });
});

module.exports = router;
