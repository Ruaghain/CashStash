import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { SignInComponent } from "./signin/signin.component";
import { SignUpComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { AppComponent } from "./app.component";
import { AuthService } from "./auth/auth.service";
import { routing } from "./app.routing";
import { WraithModule } from "./components/wraith.module";
import { AccountComponent } from "./account/account.component";
import { AccountEditComponent } from "./account/account-edit/account-edit.component";
import { AccountService } from "./account/account-service/account.service";
// import { AccountModule } from "./account/account.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    AccountEditComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    routing,
    SharedModule,
    ReactiveFormsModule,
    HttpModule,
    // AccountModule,
    WraithModule
  ],
  providers: [
    AuthService,
    AccountService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
