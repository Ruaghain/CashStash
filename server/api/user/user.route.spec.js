var request = require("request");

var base_url = "http://localhost:3000/";

describe('User API Router:', function () {

  describe('POST /', function () {
    it('successfully creates a new user', function (done) {
      var body = {
        userName: 'TestUser',
        firstName: 'One',
        lastName: 'User',
        email: 'one_user@mailinator.com',
        password: 'Passw0rd'
      };
      request.post({
        url: base_url + 'api/v1/users/',
        json: body
      }, function (error, response, body) {
        expect(response.statusCode).toBe(201);
        expect(body).toBeDefined();
        expect(body.message).toEqual('User created');
        expect(body.obj.userName).toEqual('TestUser');
        expect(body.obj.firstName).toEqual('One');
        expect(body.obj.lastName).toEqual('User');
        done();
      });
    });
  });

  describe('POST /signin', function () {
    it('successfully signs in a user', function (done) {
      var body = {
        userName: 'TestUser',
        password: 'Passw0rd'
      };
      request.post({
        url: base_url + 'api/v1/users/signin',
        json: body
      }, function (error, response, body) {
        expect(response.statusCode).toBe(201);
        expect(body).toBeDefined();
        done();
      });
    });
  });
});
