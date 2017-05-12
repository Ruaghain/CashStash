var express = require('express');
var logger = require('../../utils/logging').log;
var jwt = require('jsonwebtoken');
var config = require('../../config/environment/index');

var router = express.Router();
var Account = require('./account.model');

//This method is hit on all subsequent requests.
//Position matters - the get request won't be taken into account. The secret needs to match the
//secret used when generating the jwt key.
router.use('/', function (req, res, next) {
  logger.debug('Preparing to verifying JWT token');
  jwt.verify(req.headers['x-access-token'], config.secrets.session, function (err, decoded) {
    if (err) {
      logger.error('There was an error verifying token: %s at %s', err.message, err.expiredAt);
      return res.status(401).json({
        message: 'Not Authenticated',
        error: err
      })
    }
    logger.debug('Successfully validated JWT token');
    res.locals.user = decoded.user;
    next();
  });
});

//TODO: Implement swagger for this.
router.post('/', function (req, res) {
  logger.debug('Saving new account "%s"', req.body.name);
  var account = new Account({
    _user: res.locals.user._id,
    name: req.body.name,
    number: req.body.number,
    openingBalance: req.body.openingBalance,
    balance: req.body.balance,
    openingDate: req.body.openingDate
  });
  account.save(function (err, result) {
    logger.error('There was an error saving the account: %s', err);
    if (err) {
      return res.status(500).json({
        message: 'An error occurred',
        error: err
      })
    }

    logger.debug('Successfully saved the new account.');
    res.status(201).json({
      message: 'Account created',
      obj: result
    });
  });
});

router.put('/:id', function (req, res) {
  logger.debug('Updating account with id: "%s"', req.params.id);
  Account.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
    if (err) {
      logger.error('There was an error updating account with id: %s', err);
      return res.status(500).json({
        message: 'An error occurred',
        error: err
      })
    }

    logger.debug('Successfully updated the account.');
    res.status(201).json({
      message: 'Account updated',
      obj: result
    });
  });
});

router.get('/', function (req, res) {
  logger.debug('Getting all of the accounts for user with id "%s"', res.locals.user._id);
  Account.find({ _user: res.locals.user._id }).exec(function (err, messages) {
    if (err) {
      logger.error('There was an error retrieving accounts for user "%s"', res.locals.user._id);
      return res.status(500).json({
        message: 'An error occurred',
        error: err
      })
    }
    logger.debug('Successfully found all the accounts for user.');
    res.status(200).json({
      message: 'Success',
      obj: messages
    })
  });
});

router.get('/:id', function (req, res) {
  logger.debug('Finding account with id of "%s"', req.params.id);
  Account.findOne({ _id: req.params.id }).exec(function (err, account) {
    if (err) {
      logger.error('There was an error finding account with id of "%s"', req.params.id);
      return res.status(500).json({
        message: 'An error occurred',
        error: err
      })
    }
    logger.debug('Successfully found account');
    res.status(200).json({
      message: 'Success',
      obj: account
    })
  });
});

router.delete('/:id', function (req, res) {
  logger.debug('Deleting account with id of "%s"', req.params.id);
  Account.findOneAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      logger.error('There was an error deleting account with id "%s"', req.params.id);
      return res.status(500).json({
        message: 'An error occurred',
        error: err
      })
    }
    logger.debug('Successfully deleted account.');
    logger.debug();
    res.status(200).json({
      message: 'Account successfully deleted.'
    })
  })
});

module.exports = router;
