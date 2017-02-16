import {Routes, RouterModule} from "@angular/router";
import {SignUpComponent} from "./signup/signup.component";
import {SignInComponent} from "./signin/signin.component";

const APP_ROUTERS: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: SignInComponent},
];

export const routing = RouterModule.forRoot(APP_ROUTERS);
