import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as http from 'http';
import { Database } from './database/database';
import { CashStashBase } from '../cash-stash-base';
import { AccountRoute } from '../api/account/account-route';
import { UserRoute } from '../api/user/user-route';
import { AuthRoute } from '../api/auth/auth-route';
import { Server } from 'net';
import * as swaggerParser from 'swagger-parser';
import * as swaggerize from 'swaggerize-express';

// import * as swaggerUI from 'express-swagger-ui';

export class CashStashServer extends CashStashBase {

  private app: express.Application;
  private router: express.Router;
  private httpServer: Server;

  constructor(database: Database) {
    super();

    this.app = express();
    this.router = express.Router();

    database.connect();

    this.httpServer = http.createServer(this.app);

    this.setup();
    this.routes();
  }

  async start() {
    swaggerParser.validate('api.yml').then(async (api) => {
      try {
        this.logger.debug('Swagger has been validated correctly');
        // swaggerUI({
        //   app: this.app,
        //   swaggerUrl: '/api/v1/swagger.json',
        //   localhostPath: '/api/'
        // });
        let swaggerHandler = swaggerize({
          api: api,
          docspath: '/swagger.json',
          handlers: '../handlers'
        });
        this.app.use(swaggerHandler);
      } catch (e) {
        this.logger.error(e);
      }

      this.app.listen(this.environment.getPort(), '0.0.0.0', () => {
        this.logger.info('STARTING - Express Server. Listening on port "%d", in "%s" mode', this.environment.getPort(), this.app.get('env'));
      });
    }).catch((err) => {
      this.logger.error(err);
    });
  }

  private setup() {
    this.logger.debug('Setting up Server');

    this.app.set('view engine', 'hbs');

    this.app.use(this.logger.config());
    // app.use(helmet());

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());

    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type, accept, x-access-token');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');

      //CORS requires that an OPTIONS request is made first. Just return 200 for these.
      if ('OPTIONS' === req.method) {
        res.send(200);
      } else {
        next();
      }
    });
  }

  private routes() {
    this.logger.debug('Setting up Routes');

    new AuthRoute(this.router, '/api/v1/auth');
    new AccountRoute(this.router, '/api/v1/accounts');
    new UserRoute(this.router, '/api/v1/users');
    this.app.use(this.router);
  }
}
