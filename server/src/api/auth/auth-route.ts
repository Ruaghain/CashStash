import * as express from 'express';
import { BaseRoute } from '../base-route';
import { User } from '../user/user-model';
import * as jwt from 'jsonwebtoken';

export class AuthRoute extends BaseRoute {

  /**
   * This method generates a JWT token for the passed in user, and returns the signed value back to the calling function.
   *
   * @param user
   * @returns {*}
   */
  setTokenInformation = (user: any) => {
    let tokenObject = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    };
    this.logger.debug('Generating JWT token for user.');
    return jwt.sign({ user: tokenObject }, this.environment.getSecret(), { expiresIn: 7200 });
  };

  // router.get('/test', function (req, res) {
  //   logger.info('We are in the test.');
  //   res.status(200).json({
  //     message: 'server is up - YEEEEOOOOOOWWWW!!',
  //     result: []
  //   });
  // });
  private postSignUp = () => {
    this.logger.debug('Setting up signup request for Authentication');
    this.router.post(this.path + '/signup', (req, res, next) => {
      this.logger.debug('Signing up new user: "%s"', req.body.userName);
      let user = new User({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });
      user.save((err, result) => {
        if (err) {
          this.logger.error('There was an error saving the new user: %s', err);
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
        this.logger.debug('New user was successfully saved.');

        let token = this.setTokenInformation(result);

        //Don't need return here as it's the last statement.
        res.status(201).json({
          message: 'User created',
          result: [
            {
              token: token
            }
          ]
        })
      })
    });
  };
  private postSignIn = () => {
    this.logger.debug('Setting up signin request for Authentication');
    this.router.post(this.path + '/signin', (req, res, next) => {
      this.logger.debug('Signing in user: "%s"', req.body.userName);
      User.findOne({ userName: req.body.userName }).select('+salt +password').exec((err: any, user: any) => {
        if (err) {
          this.logger.error('There was an error finding the user');
          return res.status(500).json({
            message: 'An error occurred finding the user.',
            result: [
              {
                error: err
              }
            ]
          });
        }
        //Use this error message as it gives nothing away with regards to credentials.
        if (!user) {
          this.logger.error('User was not found.');
          return res.status(401).json({
            message: 'Login failed',
            result: [
              {
                message: 'Invalid login credentials.'
              }
            ]
          });
        }

        if (!user.authenticate(req.body.password)) {
          this.logger.error('Could not authenticate passed in user.');
          return res.status(401).json({
            message: 'Login failed',
            result: [
              {
                message: 'Invalid login credentials.'
              }
            ]
          });
        }


        let token = this.setTokenInformation(user);

        res.status(200).json({
          message: 'Successfully logged in.',
          result: [
            {
              token: token
            }
          ]
        });

        this.logger.debug('Successfully logged in user.');
      });
    });
  };

  constructor(router: express.Router, path: string) {
    super(router, path, false);
    this.postSignUp();
    this.postSignIn();
  }
}
