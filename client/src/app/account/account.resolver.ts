import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AccountService } from './account-service/account.service';
import { Account } from './account.model';

@Injectable()
export class AccountResolver implements Resolve<Account> {

  constructor(private accountService: AccountService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account>|Promise<Account>|Account {
    return this.accountService.getAccount((route.params as any).id)
  }

}
