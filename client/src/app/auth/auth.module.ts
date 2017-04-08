import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { WraithModule } from "../components/wraith.module";
import { AuthSignUpComponent } from "./auth-signup/auth-signup.component";
import { AuthSignInComponent } from "./auth-signin/auth-signin.component";
import { AuthService } from "./auth-service/auth.service";
import { AuthComponent } from "./auth.component";
import { authRouting } from "./auth.routing";

@NgModule({
  declarations: [
    AuthComponent,
    AuthSignUpComponent,
    AuthSignInComponent
  ],
  imports: [
    authRouting,
    SharedModule,
    ReactiveFormsModule,
    WraithModule
  ],
  providers: [
    AuthService,
  ]
})

export class AuthModule {
}
