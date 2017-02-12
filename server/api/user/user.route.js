var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

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

router.post('/signin', function (req, res, next) {
  User.findOne({ userName: req.body.userName }, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred finding the user.',
        error: err
      });
    }
    //Use this error message as it gives nothing away with regards to credentials.
    if (!user) {
      return res.status(401).json({
        title: 'Login failed',
        error: { message: 'Invalid login credentials.' }
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login failed',
        error: { message: 'Invalid login credentials.' }
      });
    }

    var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
    res.status(200).json({
      message: 'Successfully logged in.',
      token: token,
      userId: user._id
    })
  });
});

module.exports = router;
