import * as express from 'express';
import { BaseRoute } from '../base-route';
import { ICategoryModel } from './category-model';
import { Model } from 'mongoose';

export class CategoryRoute extends BaseRoute {

  //TODO: Possibly pass in Category model into the constructor
  constructor(router: express.Router, path: string, private categoryModel:  Model<ICategoryModel>) {
    super(router, path, true);
    this.router.get(this.path + '/', this.CategoryHandler.allCategories.get);
  }

  CategoryHandler = {
    allCategories: {
      get: (req, res) => {
        console.log('Getting all of the categories');
        this.categoryModel.find().exec((error: any, categories: any) => {
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
}

export default CategoryRoute;
