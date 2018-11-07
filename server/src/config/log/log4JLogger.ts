import { Logger } from './logger';
import * as log4js from 'log4js';

export class Log4JLogger implements Logger {

  private log: any;

  constructor() {
    // log4js.loadAppender('file');
    // log4js.configure('./log4js-configuration.json', { reloadSecs: 120 });
    log4js.configure('./src/config/log/log4js-configuration.json');
    this.log = log4js.getLogger('cash-stash');
  }

  debug(message: string, ...args: any[]): void {
    this.log.debug(message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.log.info(message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this.log.error(message, ...args);
  }

  config() {
    return log4js.connectLogger(this.log, {
      format: ':method :url',
      nolog: '\\.gif|\\.jpg$|\\.ico$'
    });
  }
}
