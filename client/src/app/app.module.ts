import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import {CategoryModule} from "./category/category.module";
import { CashModule } from './components/cash.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccountModule,
    CategoryModule,
    AuthModule,
    CashModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
