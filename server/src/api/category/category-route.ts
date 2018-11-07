import * as express from 'express';
import { BaseRoute } from '../base-route';
import { Category } from './category-model';

export class CategoryRoute extends BaseRoute {

  UsersHandler = {
    allUsers: {
      get: (req, res) => {
        // console.debug('Getting all of the categories');
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
      }
    }
  };

  constructor(router: express.Router, path: string) {
    super(router, path, true);
    this.router.get(this.path + '/', this.UsersHandler.allUsers.get);
  }
}

export default CategoryRoute;
