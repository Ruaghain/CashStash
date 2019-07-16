import * as express from 'express';
import {CashStashBase} from '../cash-stash-base';
import * as jwt from 'jsonwebtoken';

export class BaseRoute extends CashStashBase {

  protected router: express.Router;
  protected path: string;

  constructor(router: express.Router, path: string, isProtected: boolean) {
    super();
    this.path = path;
    this.router = router;
    if (isProtected) {
      this.router.use(this.path + '/', (req, res, next) => {
        this.logger.debug('Preparing to verify JWT token');
        jwt.verify(req.headers['x-access-token'][0], this.environment.getSecret(), (err: any, decoded: any) => {
          if (err) {
            this.logger.error('There was an error verifying token: %s at %s', err.message, err.expiredAt);
            return res.status(401).json({
              message: 'Not Authenticated',
              result: [
                {
                  error: err
                }
              ]
            })
          }
          this.logger.debug('Successfully validated JWT token');
          res.locals.user = decoded.user;
          next();
        });
      });
    }
  }
}
