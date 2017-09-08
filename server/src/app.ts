import { CashStashServer } from './config/cash-stash-server';
import { MongoDatabase } from './config/database/mongo-database';

const start = async () => {

  let app = new CashStashServer(new MongoDatabase());

  await app.start();

};

setImmediate(start);
