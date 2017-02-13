import {TestBed, async, inject} from "@angular/core/testing";
import {HttpModule, Http, BaseRequestOptions, Response, ResponseOptions} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {AuthService} from "./auth.service";
import {User} from "./user.model";

describe("AuthService", () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AuthService,
        {
          provide: Http,
          useFactory: (mockBackend: any, options: any) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
  }));

  describe('signup()', () => {

    it('should return a successfully created user', inject([AuthService, MockBackend], (authService: any, mockBackend: any) => {

      const mockResponse = {
        data: {
          userName: "User Name",
          password: "Password"
        }
      };

      mockBackend.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      authService.signup(new User('UserName', 'Password', 'FirstName', 'LastName', 'one.user@email.com')).subscribe((user: any) => {
        console.log(user);
        expect(user).toEqual('User Name');
      });
    }));

  });
});
