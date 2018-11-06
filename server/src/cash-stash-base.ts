import { Logger } from './config/log/logger';
import { Log4JLogger } from './config/log/log4JLogger';
import { Environment } from './config/environment/environment';

export abstract class CashStashBase {
  protected logger: Logger;
  protected environment: Environment;

  constructor() {
    //TODO: Need to make sure that these classes are singleton
    this.environment = new Environment();
    this.logger = new Log4JLogger(this.environment.getLoggingLevel());
  }
}
