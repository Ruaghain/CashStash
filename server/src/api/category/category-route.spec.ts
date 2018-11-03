import * as express from 'express';

const app = express();

describe('Category API Router', () => {
  describe('GET', () => {
    let body = {
      categories: [
        {
          name: 'Groceries',
        }, {
          name: 'Current',
        }
      ]
    };

    beforeEach(() => {
      app.get('/category', (req, res) => {
        res.status(200).json(body);
      })
    });

    it('successfully requests all the accounts', () => {
    })
  });
});
