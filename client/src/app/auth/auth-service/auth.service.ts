import {Injectable} from '@angular/core';
import {User} from '../user.model';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FlashService} from '../../components/flash/flash.service';
import {WraithBaseRequest} from '../../components/wraith-datasource/wraith.base-request';

@Injectable()
export class AuthService extends WraithBaseRequest {

  constructor(private httpClient: HttpClient, private flashService: FlashService) {
    super();
  }

  signup(user: User): Observable<any> {
    const body = JSON.stringify(user);
    return this.httpClient.post(this.baseUrl + '/auth/signup', body, {headers: super.getHeader()})
      .pipe(map((data: any) => {
        localStorage.setItem('token', data.result[0].token);
        return true;
      }), catchError((error: HttpErrorResponse) => {
        this.flashService.error(error.name + ' (' + error.message + ')');
        return Observable.throw(error)
      }));
  };

  signin = (user: User) => {
    const body = JSON.stringify(user);
    return this.httpClient.post(this.baseUrl + '/auth/signin', body, {headers: super.getHeader()})
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
