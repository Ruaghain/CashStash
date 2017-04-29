var express = require("express");
var request = require("supertest");
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

describe('User API Router:', () => {

  describe('POST /', () => {
    var body = {
      userName: 'TestUser',
      firstName: 'One',
      lastName: 'User',
      email: 'one_user@mailinator.com',
      password: 'Passw0rd'
    };

    beforeEach(() => {
      app.post('/users', (req, res) => {
        res.status(201).json(req.body)
      })
    });

    it('successfully creates a new user', () => {
      request(app).post('/users').send(body)
        .end((err, res) => {
          expect(res.body.userName, 'TestUser');
          expect(res.body.firstName, 'One');
          expect(res.body.lastName, 'User');
          expect(res.body.email, 'one_user@mailinator.com');
        });
    });
  });
});
