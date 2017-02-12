import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navigation/navbar/navbar.component";
import { TopbarComponent } from "./navigation/topbar/topbar.component";
import { SignUpComponent } from "./signup/signup.component";
import { AuthService } from "./auth/auth.service";
import { routing } from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    NavbarComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
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
