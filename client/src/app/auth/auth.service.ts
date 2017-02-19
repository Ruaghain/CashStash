import { Http, Headers, Response } from "@angular/http";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import "rxjs/Rx";
import { BaseService } from "../shared/base.service";

@Injectable()
export class AuthService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  signup = (user: User) => {
    const body = JSON.stringify(user);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.baseUrl + '/auth/signup', body, { headers: headers })
      .map((response: Response) => response.json())
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
      .map((response: Response) => {
        return response.json()
      })
      .catch((error: Response) => {
        localStorage.clear();
        // this.errorService.handleError(error.json());
        return Observable.throw(error.json())
      });
  };

  logout = () => {
    localStorage.clear();
  };

  isLoggedIn = () => {
    return localStorage.getItem('userId') != null;
  };

  //Can get the full name from the token - need to decode it from base64.
  getFullName = () => {
    //console.log(window.atob(localStorage.getItem('token')));
    return localStorage.getItem('fullName');
  }
}
