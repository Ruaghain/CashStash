var request = require("supertest");
var express = require("express");
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

describe('Auth API Router:', () => {

  describe('POST /signup', () => {
    var body = {
      userName: 'TestUser',
      firstName: 'One',
      lastName: 'User',
      email: 'one_user@mailinator.com',
      password: 'Passw0rd'
    };

    beforeEach(() => {
      app.post('/auth/signup', (req, res) => {
        res.status(201).json(req.body)
      });
    });

    it('successfully creates a new user', () => {
      request(app).post('/auth/signup').send(body)
        .end((err, res) => {
          expect(res.statusCode).toEqual(201);
          expect(res.body.userName).toEqual('TestUser');
          expect(res.body.firstName).toEqual('One');
          expect(res.body.lastName).toEqual('Two');
          expect(res.body.email).toEqual('one_user@mailiantor.com');
        });
    });
  });

  describe('POST /signin', function () {
    var body = {
      userName: 'TestUser',
      password: 'Passw0rd'
    };

    beforeEach(() => {
      app.post('/auth/signin', function (req, res) {
        res.status(201).json(req.body)
      });
    });

    it('successfully signs in a user', () => {
      request(app).post('/auth/signin').send(body)
        .end(function (err, res) {
          expect(res.statusCode).toEqual(201);
          expect(res.body.userName).toEqual('TestUser');
        });
    });
  });
});
