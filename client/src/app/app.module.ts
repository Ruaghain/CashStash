import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { WraithModule } from './components/wraith.module';
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
    HttpModule,
    AccountModule,
    AuthModule,
    WraithModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
