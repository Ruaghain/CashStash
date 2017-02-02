import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { SignUpComponent } from "./signup/signup.component";
import { routing } from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HeaderComponent
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
