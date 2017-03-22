var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();

var Account = require('./account.model');

//This method is hit on all subsequent requests.
//Position matters - the get request won't be taken into account. The secret needs to match the
//secret used when generating the jwt key.
router.use('/', function (req, res, next) {
  jwt.verify(req.headers['x-access-token'], 'secret', function (err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      })
    }
    next();
  });
});

//TODO: Implement swagger for this.
router.post('/', function (req, res, next) {
  var account = new Account({
    name: req.body.name,
    number: req.body.number,
    openingBalance: req.body.openingBalance,
    balance: req.body.balance,
    openingDate: req.body.openingDate
  });
  account.save(function (err, result) {
    if (err) {
      return res.status(500).json({
        message: 'An error occurred',
        error: err
      })
    }

    res.status(201).json({
      message: 'Account created',
      obj: result
    });
  });
});

router.put('/:id', function (req, res, next) {
  Account.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
    if (err) {
      return res.status(500).json({
        message: 'An error occurred',
        error: err
      })
    }

    res.status(201).json({
      message: 'Account updated',
      obj: result
    });
  });
});

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

router.get('/:id', function (req, res, next) {
  Account.findOne({ _id: req.params.id }).exec(function (err, account) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      })
    }
    res.status(200).json({
      message: 'Success',
      obj: account
    })
  });
});

module.exports = router;
