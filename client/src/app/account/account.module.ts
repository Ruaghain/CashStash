import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { SharedModule } from '../shared/shared.module';
import { accountRouting } from './account.routing';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account-service/account.service';
import { AccountComponent } from './account.component';
import { CashModule } from '../components/cash.module';
import { AccountListComponent } from './account-list/account-list.component';

@NgModule({
  declarations: [
    AccountComponent,
    AccountListComponent,
    AccountEditComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    CashModule,
    accountRouting
  ],
  providers: [
    AccountService,
    AccountResolver
  ]
})

export class AccountModule {
}
