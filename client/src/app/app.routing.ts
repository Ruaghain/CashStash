import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const APP_ROUTERS: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'accounts', loadChildren: './account/account.module#AccountModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTERS);
