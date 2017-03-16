import { NgModule } from "@angular/core";
import { AccountListComponent } from "./account-list/account-list.component";
import { AccountAddComponent } from "./account-edit/account-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { accountRouting } from "./account.routing";

@NgModule({
  declarations: [
    AccountListComponent,
    AccountAddComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    accountRouting
  ]
})

export class AccountModule {

}
