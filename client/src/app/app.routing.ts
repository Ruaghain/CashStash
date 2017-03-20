import { Routes, RouterModule } from "@angular/router";
import { SignUpComponent } from "./signup/signup.component";
import { SignInComponent } from "./signin/signin.component";
import { HomeComponent } from "./home/home.component";
import { AccountComponent } from "./account/account.component";
import { AccountEditComponent } from "./account/account-edit/account-edit.component";

const APP_ROUTERS: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'accounts', component: AccountComponent },
  { path: 'accounts/new', component: AccountEditComponent },
  { path: 'accounts/:id/edit', component: AccountEditComponent }
  // { path: 'accounts', loadChildren: './account/account.module#AccountModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTERS);
