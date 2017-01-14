var request = require("request");

var base_url = "http://localhost:3000/";

describe('User API Router:', function () {

  describe('POST /', function () {

    it('successfully creates a new user', function (done) {
      var body = {
        userName: 'Ruaghain',
        firstName: 'Rowan',
        lastName: 'Massey',
        email: 'rowan_massey@hotmail.com',
        password: 'Passw0rd'
      };
      request.post({
        url: base_url + 'api/v1/users/',
        json: body
      }, function (error, response, body) {
        console.log(body);
        expect(response.statusCode).toBe(201);
        done();
      });
    });
  });
});