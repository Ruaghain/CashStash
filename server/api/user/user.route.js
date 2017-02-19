var express = require('express');
var router = express.Router();

var User = require('./user.model');

router.post('/', function (req, res) {
  var user = new User({
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  });
  user.save(function (err, result) {
    if (err) {
      //Need to return here because you want it to return immediately, and not execute
      //the last code - below this return statement.
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      })
    }
    //Don't need return here as it's the last statement.
    res.status(201).json({
      message: 'User created',
      obj: result
    })
  })
});

module.exports = router;
