import { Logger } from './logger';
import * as log4js from 'log4js';

export class Log4JLogger implements Logger {

  private level: string;
  private log: any;

  constructor(level: string) {
    this.level = level;
    log4js.loadAppender('file');
    // log4js.configure('./log4js-configuration.json', { reloadSecs: 120 });
    log4js.configure('server/src/config/log/log4js-configuration.json', { reloadSecs: 120 });
    this.log = log4js.getLogger('cash-stash');
    this.log.setLevel(this.level);
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
      level: this.level,
      format: ':method :url',
      nolog: '\\.gif|\\.jpg$|\\.ico$'
    });
  }
}
