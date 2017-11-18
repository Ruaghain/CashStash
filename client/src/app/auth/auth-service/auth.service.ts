import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { Observable } from 'rxjs';
import { BaseRequestService } from '../../shared/base-request.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FlashService } from '../../components/flash/flash.service';

@Injectable()
export class AuthService extends BaseRequestService {

  constructor(private httpClient: HttpClient, private flashService: FlashService) {
    super();
  }

  signup(user: User): Observable<any> {
    const body = JSON.stringify(user);
    return this.httpClient.post(this.baseUrl + '/auth/signup', body, { headers: super.getHeader() })
      .map((data: any) => {
        localStorage.setItem('token', data.result[0].token);
        return true;
      }).catch((error: HttpErrorResponse) => {
        this.flashService.error(error.name + ' (' + error.message + ')');
        return Observable.throw(error)
      });
  };

  signin = (user: User) => {
    const body = JSON.stringify(user);
    return this.httpClient.post(this.baseUrl + '/auth/signin', body, { headers: super.getHeader() })
      .subscribe((data: any) => {
          localStorage.setItem('token', data.result[0].token);
          return true;
        },
        (error) => {
          localStorage.clear();
          this.flashService.error(error.message);
          return false
        });
  };

  logout = () => {
    localStorage.clear();
  };

  isLoggedIn = () => {
    return localStorage.getItem('token') != null;
  };

  getFullName = () => {
    let token = localStorage.getItem('token');
    //If a token exists, the proceed to parse it.
    if (token) {
      let user = JSON.parse(window.atob(token.split('.')[1])).user;
      return (user.firstName + ' ' + user.lastName);
    } else {
      return '';
    }
  }
}
