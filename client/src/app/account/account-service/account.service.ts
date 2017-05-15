import { Injectable } from '@angular/core';
import { BaseRequestService } from '../../shared/base-request.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Account } from '../account.model';
import { FlashService } from '../../components/flash/flash.service';

@Injectable()
export class AccountService extends BaseRequestService {

  constructor(private http: Http, private flashService: FlashService) {
    super()
  }

  getAccounts() {
    return this.http.get(this.baseUrl + '/accounts', { headers: super.getHeaders() })
      .map((response: Response) => response.json().result)
      .map((accounts: Array<Account>) => {
        let result: Array<Account> = [];
        if (accounts) {
          accounts.forEach((account) => {
            result.push(new Account(account.name, account.number, account.openingBalance, account.balance, account._id))
          })
        }
        return result
      }).catch((error: Response) => {
        this.flashService.error(error.json().message + ' (' + error.json().result[0].error.message + ')');
        return Observable.throw(error.json())
      })
  };

  getAccount(id: string) {
    return this.http.get(this.baseUrl + '/accounts/' + id, { headers: super.getHeaders() })
      .map((response: Response) => response.json().result[0])
      .map((account: Account) => {
        if (account) {
          return new Account(account.name, account.number, account.openingBalance, account.balance, account._id);
        }
      }).catch((error: Response) => {
        return Observable.throw(error.json())
      })
  };

  saveAccount(account: Account) {
    const body = JSON.stringify(account);
    return this.http.post(this.baseUrl + '/accounts', body, { headers: super.getHeaders() })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      })
  };

  updateAccount(id: string, account: Account) {
    const body = JSON.stringify(account);
    console.log(body);
    return this.http.put(this.baseUrl + '/accounts/' + id, body, { headers: super.getHeaders() })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      })
  }

  deleteAccount(id: string) {
    return this.http.delete(this.baseUrl + '/accounts/' + id, { headers: super.getHeaders() })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json())
      })
  }
}
