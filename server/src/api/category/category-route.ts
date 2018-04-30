import * as express from 'express';
import {BaseRoute} from "../base-route";
import {Category} from "./category-model";

export class CategoryRoute extends BaseRoute {

  constructor(router: express.Router, path: string) {
    super(router, path, true);
    this.get();
  }

  private get = () => {
    this.logger.debug('Setting up GET request for Category');
    this.router.get(this.path + '/', (req: any, res: any) => {
      this.logger.debug('Getting all of the categories');
      Category.find().exec((error: any, categories: any) => {
        if (error) {
          this.logger.error('There was an error getting all of the categories.');
          return res.status(500).json({
            message: 'An Error Occurred.',
            result: [
              {
                error: error
              }
            ]
          });
        }
        this.logger.debug('Successfully found all of the categories.');
        res.status(200).json({
          message: 'Success',
          result: categories
        })
      });
    });
  }
}
