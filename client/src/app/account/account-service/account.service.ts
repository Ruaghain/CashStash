import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Account } from '../account.model';

@Injectable()
export class AccountService extends BaseService {

  constructor(private http: Http) {
    super()
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

  getAccount = (id: string) => {
    const token = localStorage.getItem('token');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.baseUrl + '/accounts/' + id, { headers: headers })
      .map((response: Response) => response.json().obj)
      .map((account: Account) => {
        if (account) {
          return new Account(account.name, account.number, account.openingBalance, account.balance, account._id);
        }
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
  };

  updateAccount = (account: Account) => {
    const token = localStorage.getItem('token');
    const body = JSON.stringify(account);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(this.baseUrl + '/accounts/' + account._id, body, { headers: headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      })
  }
}
