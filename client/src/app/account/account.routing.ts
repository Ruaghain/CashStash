import { Routes, RouterModule } from "@angular/router";
import { AccountEditComponent } from "./account-edit/account-edit.component";
import { AccountComponent } from "./account.component";

const ACCOUNT_ROUTES: Routes = [{
  path: '', component: AccountComponent, children: [
    { path: 'new', component: AccountEditComponent },
    { path: ':id/edit', component: AccountEditComponent }
  ]
}];

export const accountRouting = RouterModule.forChild(ACCOUNT_ROUTES);
