import CategoryRoute from "./category-route";
import {Category} from "./category-model";
import * as express from 'express';

describe('Category API Router', () => {
  let subject = new CategoryRoute(express.Router(), 'api/v1/category');
  let req, res;
  let payload;

  describe('GET', () => {

    beforeEach(function() {
      payload = {
        categories: [
          {
            name: 'Groceries'
          },
          {
            name: 'Medical'
          }
        ]
      };

      req = {
        query: {},
        params: {},
        body: {},
      };

      res = {
        status: jasmine.createSpy().and.callFake(msg => {
          return msg;
        }),
        send: jasmine.createSpy().and.callFake(msg => {
          return msg;
        })
      };
    });

    let categoryPromise = {
      exec: function () {
        return {
          then: function (success, fail) {
            return success(payload);
          }
        }
      }
    };

    it('successfully gets the categories', () => {
      spyOn(Category, 'find').and.returnValue(categoryPromise);
      subject.UsersHandler.allUsers.get(req, res);
      expect(Category.find).toHaveBeenCalled();
      console.log("Request is: " + JSON.stringify(req));
      console.log("Response is: " + JSON.stringify(res));
      // expect(res.send).toHaveBeenCalledWith(payload);
    })
  });
});
