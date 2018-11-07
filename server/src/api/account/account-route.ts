import * as express from 'express';
import { BaseRoute } from '../base-route';
import { Account } from './account-model';

export class AccountRoute extends BaseRoute {

  private post = () => {
    this.logger.debug('Setting up POST request for Accounts');
    this.router.post(this.path + '/', (req, res) => {
      this.logger.debug('Saving new account "%s"', req.body.name);
      let account = new Account({
        _user: res.locals.user._id,
        name: req.body.name,
        number: req.body.number,
        openingBalance: req.body.openingBalance,
        balance: req.body.balance,
        openingDate: req.body.openingDate
      });
      account.save((err: any, result: any) => {
        this.logger.error('There was an error saving the account: %s', err);
        if (err) {
          return res.status(500).json({
            message: 'An Error Occurred',
            result: [
              {
                error: err
              }
            ]
          })
        }

        this.logger.debug('Successfully saved the new account.');
        res.status(201).json({
          message: 'Account created',
          result: [
            result
          ]
        });
      });
    });
  };

  private get = () => {
    this.logger.debug('Setting up GET request for Accounts');
    this.router.get(this.path + '/', (req, res) => {
      this.logger.debug('Getting all of the accounts for user with id "%s"', res.locals.user._id);
      Account.find({ _user: res.locals.user._id }).exec((err, accounts) => {
        if (err) {
          this.logger.error('There was an error retrieving accounts for user "%s"', res.locals.user._id);
          return res.status(500).json({
            message: 'An Error Occurred',
            result: [
              {
                error: err
              }
            ]
          })
        }
        this.logger.debug('Successfully found all the accounts for user.');
        res.status(200).json({
          message: 'Success',
          result: accounts
        })
      });
    });
  };

  private getById = () => {
    this.logger.debug('Setting up GET /:id request for Accounts');
    this.router.get(this.path + '/:id', (req, res) => {
      this.logger.debug('Finding account with id of "%s"', req.params.id);
      Account.findOne({ _id: req.params.id }).exec((err, account) => {
        if (err) {
          this.logger.error('There was an error finding account with id of "%s"', req.params.id);
          return res.status(500).json({
            message: 'An error occurred',
            result: [
              {
                error: err
              }
            ]
          })
        }
        this.logger.debug('Successfully found account');
        res.status(200).json({
          message: 'Success',
          result: [
            account
          ]
        })
      });
    });
  };

  private put = () => {
    this.logger.debug('Setting up PUT /:id request for Accounts');
    this.router.put(this.path + '/:id', (req, res) => {
      this.logger.debug('Updating account with id: "%s"', req.params.id);
      Account.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {
        if (err) {
          this.logger.error('There was an error updating account with id: %s', err);
          return res.status(500).json({
            message: 'An Error Occurred',
            result: [
              {
                error: err
              }
            ]
          })
        }

        this.logger.debug('Successfully updated the account.');
        res.status(201).json({
          message: 'Account updated',
          result: [
            result
          ]
        });
      });
    });
  };

  private delete = () => {
    this.logger.debug('Setting up DELETE request for Accounts');
    this.router.delete(this.path + '/:id', (req, res) => {
      this.logger.debug('Deleting account with id of "%s"', req.params.id);
      Account.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (err) {
          this.logger.error('There was an error deleting account with id "%s"', req.params.id);
          return res.status(500).json({
            message: 'An error occurred',
            result: [
              {
                error: err
              }
            ]
          })
        }
        this.logger.debug('Successfully deleted account.');
        res.status(200).json({
          message: 'Account successfully deleted.',
          result: []
        })
      })
    });
  };

  constructor(router: express.Router, path: string) {
    super(router, path, true);
    this.get();
    this.getById();
    this.post();
    this.put();
    this.delete();
  }

}
