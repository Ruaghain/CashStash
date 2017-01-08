var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();

var Account = require('../models/account');

router.get('/', function (req, res, next) {
  Account.find().exec(function (err, messages) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      })
    }
    res.status(200).json({
      message: 'Success',
      obj: messages
    })
  });
});

//This method is hit on all subsequent requests.
//Position matters - the get request won't be taken into account. The secret needs to match the
//secret used when generating the jwt key.
// router.use('/', function (req, res, next) {
//   jwt.verify(req.query.token, 'secret', function (err, decoded) {
//     if (err) {
//       return res.status(401).json({
//         title: 'Not Authenticated',
//         error: err
//       })
//     }
//     next();
//   });
// });

module.exports = router;
