import { async, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User } from '../user.model';
import { FlashService } from '../../components/flash/flash.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {

  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        FlashService
      ]
    });
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  describe('signup', () => {

    const authResponse = {
      result: [{
        token: '1234567'
      }]
    };

    it('will return true for newly created user', (done) => {
      authService.signup(new User('UserName', 'Password', 'FirstName', 'LastName', 'one.user@email.com')).subscribe((token: any) => {
        expect(token).toBeTruthy();
        done();
      });

      const request = httpMock.expectOne('undefined/auth/signup');
      expect(request.request.method).toEqual('POST');

      request.flush(authResponse);

      httpMock.verify();
    });
  });
});
