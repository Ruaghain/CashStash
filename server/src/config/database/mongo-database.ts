import { Database } from './database';
import * as mongoose from 'mongoose';
import { CashStashBase } from '../../cash-stash-base';

export class MongoDatabase extends CashStashBase implements Database {

  constructor() {
    super();
  }

  public async connect() {
    console.debug('Connecting to Mongo database.');

    // mongoose.Promise = global.Promise;
    try {
      await mongoose.connect(this.environment.getMongoUrl());
    } catch (err) {
      console.error(`There was an error connecting to Mongoose: ${err}`);
      process.exit(-1);
    }
  }
}
