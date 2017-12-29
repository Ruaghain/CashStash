import { Component, OnInit } from '@angular/core';
import { ButtonListItem } from '../../components/button-list/button-list-item/button-list-item';
import { Router } from '@angular/router';
import { AccountService } from '../account-service/account.service';
import { Account } from '../account.model';

@Component({
  selector: 'cash-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})

export class AccountListComponent implements OnInit {
  private buttons: ButtonListItem[] = [];

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((accounts: any) => {
      accounts.forEach((account: Account) => {
        let buttonItem = new ButtonListItem(account);
        buttonItem.addLabel(account.name);
        buttonItem.addLabel(account.balance.toString(), account.balance >= 0 ? 'forestgreen' : 'indianred');
        this.buttons.push(buttonItem);
      });
    });
  }

  onAccountAdd(): void {
    this.router.navigateByUrl('/accounts/new');
  };

  onAccountSelected(event: any): void {
    let url = `/accounts/${event.associatedObject._id}/edit`;
    this.router.navigateByUrl(url);
  };
}
