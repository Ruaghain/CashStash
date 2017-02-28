var request = require("supertest");
var express = require("express");

const app = express();

describe('Auth API Router:', function () {

  describe('POST /signin', function () {
    var body = {
      userName: 'TestUser',
      firstName: 'One',
      lastName: 'User',
      email: 'one_user@mailinator.com',
      password: 'Passw0rd'
    };

    beforeEach(() => {
      app.post('/auth/signin', function (req, res) {
        res.status(201).json(req.body)
      });
    });

    it('successfully creates a new user', () => {
      request(app).post('/auth/signin', body)
      .expect(201)
      .then(response => {
        expect(response.body.userName, 'TestUser');
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
      request(app).post('/auth/signin', body)
      .expect(201)
      .then(response => {
        expect(response.body.userName, 'TestUser');
      });
    });
  });
});
