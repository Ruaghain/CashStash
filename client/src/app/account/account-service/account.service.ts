import { Injectable, EventEmitter } from "@angular/core";
import { BaseService } from "../../shared/base.service";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Account } from "../account.model";

@Injectable()
export class AccountService extends BaseService {

  selectedAcc = new EventEmitter<Account>();

  constructor(private http: Http) {
    super()
  }

  selectedAccount(account: Account) {
    this.selectedAcc.emit(account);
  }

  getAccounts = () => {
    const token = localStorage.getItem('token');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.baseUrl + '/accounts', { headers: headers })
      .map((response: Response) => response.json().obj)
      .map((accounts: Array<Account>) => {
        let result: Array<Account> = [];
        if (accounts) {
          accounts.forEach((account) => {
            result.push(new Account(account.name, account.number, account.openingBalance, account.balance, account._id))
          })
        }
        return result
      }).catch((error: Response) => {
        return Observable.throw(error.json())
      })
  };

  saveAccount = (account: Account) => {
    const token = localStorage.getItem('token');
    const body = JSON.stringify(account);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.baseUrl + '/accounts', body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      })
  }
}
