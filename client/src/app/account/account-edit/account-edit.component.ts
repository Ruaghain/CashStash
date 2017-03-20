import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from "../account-service/account.service";
import { Account } from "../account.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'cash-edit-account',
  styleUrls: ['./account-edit.component.scss'],
  templateUrl: 'account-edit.component.html'
})

export class AccountEditComponent implements OnInit, OnDestroy {
  private accountEditForm: FormGroup;
  //private accountSubscription: Subscription;
  private isNew = true;
  //private accountId: number;
  private account: Account;

  constructor(private route: ActivatedRoute, private accountService: AccountService, private router: Router) {

  }

  ngOnInit() {
    this.accountService.selectedAcc.subscribe(
      data => {
        console.log('Data is: ' + JSON.stringify(data));
        this.account = data;
        console.log('Account is: ' + JSON.stringify(this.account));
      }
    );

    this.isNew = !this.account;
    //this.accountSubscription = this.route.params.subscribe(
    //  (params: any) => {
    //    if (params.hasOwnProperty('id')) {
    //      this.isNew = false;
    //      //The plus sign converts it into a number.
    //      this.accountId = params['id'];
    //      // this.account = this.accountService.getAccount(this.accountId);
    //    } else {
    //      this.isNew = true;
    //      this.account = null;
    //    }
    //    this.initForm();
    //  }
    //)
    this.initForm();
  }

  ngOnDestroy() {
    this.accountService.selectedAcc.unsubscribe();
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

    this.accountService.saveAccount(account).subscribe(
      data => {
        this.router.navigateByUrl('/accounts');
      }, error => {
        console.log('There was an error saving the account: ' + error)
      }
    );
  };

  onCancel = () => {
    this.router.navigateByUrl('/accounts');
  }
}
