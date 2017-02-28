var request = require("supertest");
var express = require("express");

const app = express();

describe('User API Router:', function () {

  describe('POST /', function () {
    var body = {
      userName: 'TestUser',
      firstName: 'One',
      lastName: 'User',
      email: 'one_user@mailinator.com',
      password: 'Passw0rd'
    };

    beforeEach(() => {
      app.post('/users', function (req, res) {
        res.status(201).json(req.body)
      })
    });

    it('successfully creates a new user', () => {
      request(app).post('/users', body)
      .expect(201)
      .then(response => {
        console.log(response.body);
        expect(response.body.userName, 'TestUser')
      });
    });
  });
});
