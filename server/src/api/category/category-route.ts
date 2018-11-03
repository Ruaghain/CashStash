import * as express from 'express';
import {BaseRoute} from "../base-route";
import {Category} from "./category-model";

export class CategoryRoute extends BaseRoute {

  constructor(router: express.Router, path: string) {
    super(router, path, true);
    this.get();
  }

  private get = () => {
    console.debug('Setting up GET request for Category');
    this.router.get(this.path + '/', (req: any, res: any) => {
      console.debug('Getting all of the categories');
      Category.find().exec((error: any, categories: any) => {
        if (error) {
          console.error('There was an error getting all of the categories.');
          return res.status(500).json({
            message: 'An Error Occurred.',
            result: [
              {
                error: error
              }
            ]
          });
        }
        console.debug('Successfully found all of the categories.');
        res.status(200).json({
          message: 'Success',
          result: categories
        })
      });
    });
  }
}
