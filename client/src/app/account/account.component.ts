import { Component, OnInit } from "@angular/core";
import { ButtonListItem } from "../components/button-list/button-list-item/button-list-item";
import { Router } from "@angular/router";
import { AccountService } from "./account-service/account.service";
import { Account } from "./account.model";

@Component({
  selector: 'cash-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {
  private buttons: ButtonListItem[] = [];

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    let accounts: Account[] = [];
    this.accountService.getAccounts().subscribe(
      (result) => {
        accounts = result;
        accounts.forEach((account) => {
          let buttonItem = new ButtonListItem(account);
          buttonItem.addLabel(account.name);
          buttonItem.addLabel(account.balance.toString(), account.balance >= 0 ? 'forestgreen' : 'indianred');
          this.buttons.push(buttonItem);
        })
      }
    );
  }

  onAccountAdd = () => {
    this.router.navigateByUrl('/accounts/new');
  };

  onAccountSelected = (event: any) => {
    this.accountService.selectedAccount(event.associatedObject);
    let url = `/accounts/${event.associatedObject._id}/edit`;
    this.router.navigateByUrl(url);
  };
}
