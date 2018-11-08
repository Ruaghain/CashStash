import CategoryRoute from './category-route';
import * as express from 'express';
import { Model } from 'mongoose';
import { ICategoryModel } from './category-model';

describe('Category API Router', () => {
  // let payload: ICategory[] = [
  //   {
  //     name: 'Groceries',
  //     parent: null
  //   },
  //   {
  //     name: 'Medical',
  //     parent: null
  //   }
  // ];

  let categoryMock = jasmine.createSpyObj<Model<ICategoryModel>>(['find']);

  let subject = new CategoryRoute(express.Router(), 'api/v1/category', categoryMock);
  let req, res;

  describe('GET', () => {
    beforeEach(function () {
      req = {
        query: {},
        params: {},
        body: {},
      };

      res = {
        status: jasmine.createSpy().and.callFake(msg => {
          return this;
        }),
        send: jasmine.createSpy().and.callFake(msg => {
          return this;
        })
      };
    });

    // let categoryPromise = {
    //   exec: function () {
    //     return {
    //       then: function (success, fail) {
    //         return success(payload);
    //       }
    //     }
    //   }
    // };

    it('successfully gets the categories', () => {
      // spyOn(categoryMock, 'find').and.returnValue(payload);
      let result = subject.CategoryHandler.allCategories.get(req, res);
      expect(categoryMock.find).toHaveBeenCalled();
      console.log(`Result is ${result}`);
      // expect(res.send).toHaveBeenCalledWith(payload);
    })
  });
});
