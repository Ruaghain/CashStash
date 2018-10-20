import { Environment } from './config/environment/environment';

export abstract class CashStashBase {
  protected environment: Environment;

  constructor() {
    //TODO: Need to make sure that these classes are singleton
    this.environment = new Environment();
  }
}
