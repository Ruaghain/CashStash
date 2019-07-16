import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Account} from '../account.model';
import {HttpClient} from '@angular/common/http';
import {FlashService} from '../../components/flash/flash.service';
import {WraithRestDatasource} from '../../components/wraith-datasource/wraith.rest.datasource';
import {catchError} from "rxjs/operators";

@Injectable()
export class AccountService extends WraithRestDatasource<Account> {

  constructor(httpClient: HttpClient, private flashService: FlashService) {
    super(httpClient, 'account');
  }

  getAccounts() {
    return this.getAll()
      .pipe(catchError((error) => {
        this.flashService.error(error);
        return Observable.throw(error)
      }));
  };

  getAccount(id: string) {
    return this.get(id)
      .pipe(catchError((error) => {
        this.flashService.error(error);
        return Observable.throw(error)
      }));
  };

  saveAccount(account: Account) {
    return this.insert(account)
      .pipe(catchError((error) => {
        this.flashService.error(error);
        return Observable.throw(error);
      }));
  };

  updateAccount(id: string, account: Account) {
    return this.update(id, account)
      .pipe(catchError((error) => {
        this.flashService.error(error);
        return Observable.throw(error)
      }));
  }

  deleteAccount(id: string) {
    return this.remove(id)
      .pipe(catchError((error) => {
        this.flashService.error(error);
        return Observable.throw(error)
      }));
  }
}
