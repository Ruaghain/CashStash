import { Routes, RouterModule } from "@angular/router";
import { AccountListComponent } from "./account-list/account-list.component";
import { AccountAddComponent } from "./account-edit/account-edit.component";

const ACCOUNT_ROUTES: Routes = [
  {
    path: '', component: AccountListComponent, children: [
    { path: ':id', component: AccountAddComponent }
  ]
  }
];

export const accountRouting = RouterModule.forChild(ACCOUNT_ROUTES);
