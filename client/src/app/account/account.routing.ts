import { RouterModule, Routes } from '@angular/router';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { AccountComponent } from './account.component';
import { AccountResolver } from './account.resolver';
import { AccountListComponent } from './account-list/account-list.component';

const ACCOUNT_ROUTES: Routes = [{
  path: 'accounts', component: AccountComponent, children: [
    { path: '', component: AccountListComponent },
    { path: 'new', component: AccountEditComponent },
    { path: ':id/edit', component: AccountEditComponent, resolve: { account: AccountResolver } }
  ]
}];

export const accountRouting = RouterModule.forChild(ACCOUNT_ROUTES);
