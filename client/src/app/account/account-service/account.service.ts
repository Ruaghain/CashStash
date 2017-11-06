import {Injectable} from '@angular/core';
import {BaseRequestService} from '../../shared/base-request.service';
import {Observable} from 'rxjs';
import {Account} from '../account.model';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {FlashService} from "../../components/flash/flash.service";

@Injectable()
export class AccountService extends BaseRequestService {

  constructor(private httpClient: HttpClient, private flashService: FlashService) {
    super()
  }

  getAccounts(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/accounts', {headers: super.getAuthHeaders()})
      .map((data: any) => data.result)
      .map((accounts: Array<Account>) => {
        let result: Array<Account> = [];
        if (accounts) {
          accounts.forEach((account: any) => {
            result.push(new Account(account.name, account.number, account.openingBalance, account.balance, account._id))
          });
        }
        return result
      }).catch((error: HttpErrorResponse) => {
        this.flashService.error(error.name + ' (' + error.message + ')');
        return Observable.throw(error)
      })
  };

  getAccount(id: string) {
    return this.httpClient.get(this.baseUrl + '/accounts/' + id, {headers: super.getAuthHeaders()})
      .map((data: any) => data.result[0])
      .map((account: Account) => {
        if (account) {
          return new Account(account.name, account.number, account.openingBalance, account.balance, account._id);
        }
      }).catch((error: HttpErrorResponse) => {
        return Observable.throw(error)
      })
  };

  saveAccount(account: Account) {
    const body = JSON.stringify(account);
    return this.httpClient.post(this.baseUrl + '/accounts', body, {headers: super.getAuthHeaders()})
      .map((data: any) => data)
      .catch((error: HttpErrorResponse) => {
        return Observable.throw(error)
      })
  };

  updateAccount(id: string, account: Account) {
    const body = JSON.stringify(account);
    console.log(body);
    return this.httpClient.put(this.baseUrl + '/accounts/' + id, body, {headers: super.getAuthHeaders()})
      .map((data: any) => data)
      .catch((error: HttpErrorResponse) => {
        return Observable.throw(error)
      })
  }

  deleteAccount(id: string) {
    return this.httpClient.delete(this.baseUrl + '/accounts/' + id, {headers: super.getAuthHeaders()})
      .map((data: any) => data)
      .catch((error: HttpErrorResponse) => {
        return Observable.throw(error)
      })
  }
}
