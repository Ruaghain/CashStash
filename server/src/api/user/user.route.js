var express = require('express');
var logger = require('../../utils/logging').log;
var router = express.Router();

var User = require('./user.model');

router.post('/', function (req, res) {
  logger.debug('Saving new user "%s"', req.body.userName);
  var user = new User({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function (err, result) {
    if (err) {
      logger.error('There was an error saving user "%s"', user.userName);
      //Need to return here because you want it to return immediately, and not execute
      //the last code - below this return statement.
      return res.status(500).json({
        message: 'An error occurred',
        result: [
          {
            error: err
          }
        ]
      })
    }
    logger.debug('Successfully created the new user.');
    //Don't need return here as it's the last statement.
    res.status(201).json({
      message: 'User created',
      result: [
        result
      ]
    })
  }).then()
});

module.exports = router;
