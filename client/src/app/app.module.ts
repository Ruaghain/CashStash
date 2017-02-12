import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navigation/navbar/navbar.component";
import { TopbarComponent } from "./navigation/topbar/topbar.component";
import { SignUpComponent } from "./signup/signup.component";
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
    ReactiveFormsModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
