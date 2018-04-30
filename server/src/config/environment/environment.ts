import * as path from 'path';

export class Environment {

  private env: string;
  private logging: string;
  private root: string;
  private ipAddress: string;
  private secret: string;
  private mongoUrl: string;
  private port: number;
  private databaseName: string;

  getEnv = () => {
    return this.env;
  };

  getLoggingLevel = () => {
    return this.logging;
  };

  getRoot = () => {
    return this.root;
  };

  getIpAddress = () => {
    return this.ipAddress;
  };

  getSecret = () => {
    return this.secret;
  };

  getMongoUrl = () => {
    return this.mongoUrl;
  };

  getPort = () => {
    return this.port;
  };

  getDatabaseName = () => {
    return this.databaseName;
  };

  constructor() {
    this.env = process.env.NODE_ENV || 'development';
    this.logging = process.env.LOGGING_LEVEL || 'ERROR';
    // this.logging = process.env.LOGGING_LEVEL || 'TRACE';
    this.root = path.normalize(__dirname + '/../../..');
    this.port = parseInt(process.env.PORT) || 3000;
    // this.ipAddress = process.env.IP || '192.168.99.100';
    this.ipAddress = process.env.IP || 'localhost';
    this.secret = process.env.SECRET || 'secret';
    this.databaseName = process.env.databaseName || 'cash-stash';
    this.mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/cash-stash';
    // this.databaseName = process.env.databaseName || 'cash-stash-development';
  }
}
