import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TopbarComponent } from "./components/topbar/topbar.component";
import { ButtonItemComponent } from "./components/button-list/button-list-item/button-list-item.component";
import { ButtonListComponent } from "./components/button-list/button-list.component";
import { AccountListComponent } from "./account/account-list.component";
import { SignInComponent } from "./signin/signin.component";
import { SignUpComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { AppComponent } from "./app.component";
import { AuthService } from "./auth/auth.service";
import { routing } from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    NavbarComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    AccountListComponent,
    ButtonListComponent,
    ButtonItemComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlexLayoutModule
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
