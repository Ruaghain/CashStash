import { async, inject, TestBed } from "@angular/core/testing";
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { AuthService } from "./auth.service";
import { User } from "../user.model";

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
        userName: "User Name",
        password: "Password"
      };

      mockBackend.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      authService.signup(new User('UserName', 'Password', 'FirstName', 'LastName', 'one.user@email.com')).subscribe((result: boolean) => {
        expect(result).toEqual(true);
      });
    }));

  });
});
