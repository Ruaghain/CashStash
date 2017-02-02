import { Routes, RouterModule } from "@angular/router";
import { SignUpComponent } from "./signup/signup.component";

const APP_ROUTERS: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTERS);
