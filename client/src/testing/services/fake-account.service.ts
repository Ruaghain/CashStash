import { Observable } from 'rxjs';
import { Account } from '../../app/account/account.model';
import { AccountService } from '../../app/account/account-service/account.service';

export { Account } from './../../app/account/account.model';
export { AccountService } from './../../app/account/account-service/account.service';

export let ACCOUNTS: Account[] = [
  new Account('Current', '123456789', 200, 300, '1'),
  new Account('Credit Card', '234567890', 0.00, -500, '2'),
  new Account('Savings', '345678901', 0.00, 0.37, '3')
];

export class FakeAccountService extends AccountService {
  accounts = ACCOUNTS.map(a => a.clone());

  getAccounts(): Observable<any> {
    return Observable.of(this.accounts);
  };

  // getAccounts(): Array<Account> {
  //   return ACCOUNTS;
  // };

  getAccount(id: string): Observable<any> {
    let account = this.accounts.find(a => a._id === id);
    return Observable.of(account);
  }

  saveAccount(account: Account): Observable<any> {
    return Observable.of(account)
  }

  updateAccount(id: string, account: Account): Observable<any> {
    let foundAccount = this.accounts.find(a => a._id === id);
    return Observable.of(foundAccount);
  }

  deleteAccount(id: string): Observable<any> {
    let successMessage = {
      message: 'Account successfully deleted'
    };
    return Observable.of(successMessage);
  }
}
