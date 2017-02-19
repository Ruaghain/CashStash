import { Routes, RouterModule } from "@angular/router";
import { SignUpComponent } from "./signup/signup.component";
import { SignInComponent } from "./signin/signin.component";
import { HomeComponent } from "./home/home.component";

const APP_ROUTERS: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'home', component: HomeComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTERS);
