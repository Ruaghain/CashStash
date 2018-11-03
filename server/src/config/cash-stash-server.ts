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
import * as swaggerUi from 'swagger-ui-express';

export class CashStashServer extends CashStashBase {

  private app: express.Application;
  private router: express.Router;
  // @ts-ignore
  private httpServer: Server;

  constructor(private database: Database) {
    super();
    console.debug('Creating Cash Stash Server');

    this.app = express();
    this.router = express.Router();

    this.httpServer = http.createServer(this.app);

    this.setup();
    this.routes();
  }

  async start() {
    console.info('Starting Cash Stash Server');

    try {
      await this.database.connect();
      let api = await swaggerParser.validate('api.yml');

      console.debug('Swagger has been validated correctly');
      let options = {
        explorer: false
      };
      this.app.use('/api/v1/', swaggerUi.serve, swaggerUi.setup(api, options));

      this.app.listen(this.environment.getPort(), '0.0.0.0', () => {
        console.info('STARTING - Express Server. Listening on port "%d", in "%s" mode', this.environment.getPort(), this.app.get('env'));
      });
    } catch (e) {
      console.error(`There was an error on server start ${e}`);
    }
  }

  private setup() {
    console.debug('Setting up Server');

    this.app.set('view engine', 'hbs');

    // app.use(helmet());

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());

    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'origin, x-requested-with, content-type, accept, x-access-token');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');

      //CORS requires that an OPTIONS request is made first. Just return 200 for these.
      if ('OPTIONS' === req.method) {
        res.send(200);
      } else {
        next();
      }
    });
  }

  private routes() {
    console.debug('Setting up Routes');

    new AuthRoute(this.router, '/api/v1/auth');
    new AccountRoute(this.router, '/api/v1/account');
    new UserRoute(this.router, '/api/v1/user');
    this.app.use(this.router);
  }
}
