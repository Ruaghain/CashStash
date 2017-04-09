import { RouterModule, Routes } from "@angular/router";
import { AuthSignUpComponent } from "./auth-signup/auth-signup.component";
import { AuthSignInComponent } from "./auth-signin/auth-signin.component";
import { AuthComponent } from "./auth.component";

const ACCOUNT_ROUTES: Routes = [{
  path: 'auth', component: AuthComponent, children: [
    { path: '', component: AuthSignInComponent },
    { path: 'signin', component: AuthSignInComponent },
    { path: 'signup', component: AuthSignUpComponent }
  ]
}];

export const authRouting = RouterModule.forChild(ACCOUNT_ROUTES);
