import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { BaseRequestService } from '../../shared/base-request.service';
import { FlashService } from '../../components/flash/flash.service';

@Injectable()
export class AuthService extends BaseRequestService {

  constructor(private http: Http, private flashService: FlashService) {
    super();
  }

  signup = (user: User) => {
    const body = JSON.stringify(user);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.baseUrl + '/auth/signup', body, { headers: headers })
      .map((response: Response) => response.json())
      .map(data => {
        if (data) {
          localStorage.setItem('token', data.result[0].token);
          return true;
        }
      })
      .catch((error: Response) => {
        return Observable.throw(error.json())
      })
  };

  signin = (user: User) => {
    const body = JSON.stringify(user);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.baseUrl + '/auth/signin', body, { headers: headers })
      .map((response: Response) => response.json())
      .map(data => {
        if (data) {
          localStorage.setItem('token', data.result[0].token);
          return true;
        }
      })
      .catch((error: Response) => {
        localStorage.clear();
        this.flashService.error(error.json().result[0].error.message);
        return Observable.throw(error.json())
      });
  };

  logout = () => {
    localStorage.clear();
  };

  isLoggedIn = () => {
    return localStorage.getItem('token') != null;
  };

  getFullName = () => {
    let user = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1])).user;
    return (user.firstName + ' ' + user.lastName);
  }
}
