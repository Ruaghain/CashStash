var express = require("express");
var request = require("supertest");
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
        res.status(201).json(req.body);
      })
    });

    it('successfully creates a new account', () => {
      request(app)
        .post('/accounts').send(body)
        .end(function (err, res) {
          expect(res.statusCode).toEqual(201);
          expect(res.body.name).toEqual('Current');
          expect(res.body.number).toEqual('12345678');
          expect(res.body.openingBalance).toEqual(500.32);
          expect(res.body.balance).toEqual(-500);
        });
    });
  });
});
