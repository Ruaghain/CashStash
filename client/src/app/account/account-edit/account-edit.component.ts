import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from "../account-service/account.service";
import { Account } from "../account.model";

@Component({
  selector: 'cash-edit-account',
  styleUrls: ['./account-edit.component.scss'],
  templateUrl: 'account-edit.component.html'
})

export class AccountEditComponent implements OnInit {
  private accountEditForm: FormGroup;
  private isNew = true;
  private account: Account;

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router) {

  }

  ngOnInit() {
    this.account = this.route.snapshot.data['account'];
    this.isNew = !this.account;
    this.initForm();
  }

  private initForm() {
    let accountName = '';
    let accountNumber = '';
    let accountOpeningBalance = '';
    let accountBalance = '';

    if (!this.isNew) {
      accountName = this.account.name;
      accountNumber = this.account.number;
      accountOpeningBalance = String(this.account.openingBalance);
      accountBalance = String(this.account.balance);
    }

    this.accountEditForm = new FormGroup({
      name: new FormControl(
        accountName, [
          Validators.required
        ]),
      number: new FormControl(
        accountNumber, [
          Validators.required
        ]),
      openingBalance: new FormControl(
        accountOpeningBalance, [
          Validators.required
        ]),
      balance: new FormControl(
        accountBalance, [
          Validators.required
        ])
    })
  };

  onSubmit = () => {
    const account = new Account(
      this.accountEditForm.value.name,
      this.accountEditForm.value.number,
      this.accountEditForm.value.openingBalance,
      this.accountEditForm.value.balance
    );

    if (this.isNew) {
      this.accountService.saveAccount(account).subscribe(
        () => {
          this.router.navigateByUrl('/accounts');
        }, error => {
          console.log('There was an error saving the account: ' + error)
        }
      );
    } else {
      this.accountService.updateAccount(this.account._id, account).subscribe(
        () => {
          this.router.navigateByUrl('/accounts');
        }, error => {
          console.log('There was an error saving the account: ' + JSON.stringify(error))
        }
      );
    }
  };

  onCancel = () => {
    this.router.navigateByUrl('/accounts');
  }
}
