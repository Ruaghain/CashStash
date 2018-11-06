import { Database } from './database';
import * as mongoose from 'mongoose';
import { CashStashBase } from '../../cash-stash-base';

export class MongoDatabase extends CashStashBase implements Database {

  constructor() {
    super();
  }

  public connect() {
    this.logger.debug('Connecting to Mongo database.');

    // mongoose.Promise = global.Promise;
    mongoose.connect(this.environment.getMongoUrl());
    mongoose.connection.on('error', (err: any) => {
      this.logger.info('MongoDB connection error: ' + err);
      process.exit(-1);
    });

  }

}
