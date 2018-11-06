import * as express from 'express';
import { BaseRoute } from '../base-route';
import { User } from './user-model';

export class UserRoute extends BaseRoute {

  private post = () => {
    this.logger.debug('Setting up POST request for User');
    this.router.post(this.path + '/', (req, res) => {
      this.logger.debug('Saving new user "%s"', req.body.userName);
      let user = new User({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });
      user.save((err, result) => {
        if (err) {
          this.logger.error('There was an error saving user "%s"', user.userName);
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
        this.logger.debug('Successfully created the new user.');
        //Don't need return here as it's the last statement.
        res.status(201).json({
          message: 'User created',
          result: [
            result
          ]
        })
      })
    })
  };

  constructor(router: express.Router, path: string) {
    super(router, path, false);
    this.post();
  }
}

