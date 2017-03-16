import { Injectable } from "@angular/core";
import { BaseService } from "../../shared/base.service";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Account } from "../account.model";

@Injectable()
export class AccountService extends BaseService {

  constructor(private http: Http) {
    super()
  }

  getAccounts = () => {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.get(this.baseUrl + '/accounts', { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      })
  };

  saveAccount = (account: Account) => {
    const body = JSON.stringify(account);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.baseUrl + '/accounts', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      })
  }
}
