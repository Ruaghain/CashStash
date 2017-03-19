import { NgModule } from "@angular/core";
import { AccountEditComponent } from "./account-edit/account-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { accountRouting } from "./account.routing";

@NgModule({
  declarations: [
    AccountEditComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    accountRouting
  ]
})

export class AccountModule {

}
