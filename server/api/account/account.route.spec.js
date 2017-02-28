var request = require("supertest");
var express = require("express");

const app = express();

describe('Account API Router:', function () {

  describe('POST /', function () {
    var body = {
      name: 'Current',
      number: '12345678',
      openingBalance: 500.32,
      balance: -500
    };
    beforeEach(() => {
      app.post('/accounts', function (req, res) {
        res.status(201).json(req.body)
      })
    });

    it('successfully creates a new account', () => {
      request(app).post('/accounts', body)
      .expect(201)
      .then(response => {
        expect(response.body.name, 'Current')
      });
    });
  });
});
