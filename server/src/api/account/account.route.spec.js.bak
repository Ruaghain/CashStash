var express = require("express");
var request = require("supertest");
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

describe('Account API Router:', () => {

  describe('POST /', () => {

    var body = {
      name: 'Current',
      number: '12345678',
      openingBalance: 500.32,
      balance: -500
    };

    beforeEach(() => {
      app.post('/accounts', (req, res) => {
        res.status(201).json(req.body);
      })
    });

    it('successfully creates a new account', () => {
      request(app)
        .post('/accounts').send(body)
        .end((err, res) => {
          expect(res.statusCode).toEqual(201);
          expect(res.body.name).toEqual('Current');
          expect(res.body.number).toEqual('12345678');
          expect(res.body.openingBalance).toEqual(500.32);
          expect(res.body.balance).toEqual(-500);
        });
    });
  });

  describe('GET /', () => {
    var body = {
      accounts: [
        {
          name: 'Savings',
          number: '11111111',
          openingBalance: 0.00,
          balance: 2000
        }, {
          name: 'Current',
          number: '12345678',
          openingBalance: 500.32,
          balance: -500
        }
      ]
    };

    beforeEach(() => {
      app.get('/accounts', (req, res) => {
        res.status(200).json(body);
      })
    });

    it('successfully requests all the accounts', () => {
      request(app)
        .get('/accounts')
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.accounts.length).toEqual(2);
          expect(res.body.accounts[0].name).toEqual('Savings');
          expect(res.body.accounts[1].name).toEqual('Current');
        });
    })
  });

  describe('GET /id', () => {
    var body = {
      name: 'Current',
      number: '12345678',
      openingBalance: 500.32,
      balance: -500
    };

    beforeEach(() => {
      app.get('/accounts/1', (req, res) => {
        res.status(200).json(body);
      })
    });

    it('successfully requests all the accounts', () => {
      request(app)
        .get('/accounts/1')
        .end((err, res) => {
          expect(res.statusCode).toEqual(200);
          expect(res.body.name).toEqual('Current');
        });
    })
  })
});
