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
    return this.http.post(this.baseUrl + '/users', body, { headers: headers })
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
    return this.http.post(this.baseUrl + '/users/signin', body, { headers: headers })
      .map((response: Response) => {
        console.log('User signed in successfully. Sign them in.');
        return response.json()
      })
      .catch((error: Response) => {
        // this.errorService.handleError(error.json());
        return Observable.throw(error.json())
      });
  };

  logout = () => {
    localStorage.clear();
  };

  isLoggedIn = () => {
    return localStorage.getItem('cashToken') != null;
  };

  getFullName = () => {
    return "Full Name";
  }
}
