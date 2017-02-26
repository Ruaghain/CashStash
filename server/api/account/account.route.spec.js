var request = require("request");

var base_url = "http://localhost:3000/";

describe('Account API Router:', function () {

  describe('POST /', function () {
    it('successfully creates a new account', function (done) {
      var body = {
        name: 'Current',
        number: '12345678',
        openingBalance: 500.32,
        balance: -500
      };
      request.post({
        url: base_url + 'api/v1/accounts/',
        json: body
      }, function (error, response, body) {
        console.log(error);
        expect(response.statusCode).toBe(201);
        expect(body).toBeDefined();
        expect(body.message).toEqual('Account created');
        expect(body.obj.name).toEqual('Current');
        expect(body.obj.number).toEqual('12345678');
        expect(body.obj.openingBalance).toEqual('500.32');
        done();
      });
    });
  });

  describe('GET /', function () {
    it('successfully gets all accounts', function (done) {
      request.get({
        url: base_url + 'api/v1/accounts/'
      }, function (error, response, body) {
        console.log(error);
        console.log(response);
        console.log(body);
        done();
      });
    });
  });

});
