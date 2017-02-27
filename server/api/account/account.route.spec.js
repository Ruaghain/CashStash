var request = require("supertest");
var express = require("express");


const app = express();
const base_url = "http://localhost:3000/";

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

    it('successfully creates a new account', function (done) {
      request(app).post('/accounts', body).
        expect(response.statusCode).toBe(201);
        expect(body).toBeDefined();
      expect(body.name).toEqual('Current');
        done();
    });
  });
});
