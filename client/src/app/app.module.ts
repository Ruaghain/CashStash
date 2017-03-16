import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { AccountListComponent } from "./account/account-list/account-list.component";
import { SignInComponent } from "./signin/signin.component";
import { SignUpComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { AppComponent } from "./app.component";
import { AuthService } from "./auth/auth.service";
import { routing } from "./app.routing";
import { WraithModule } from "./components/wraith.module";
import { AccountComponent } from "./account/account.component";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    AccountListComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlexLayoutModule,
    WraithModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
