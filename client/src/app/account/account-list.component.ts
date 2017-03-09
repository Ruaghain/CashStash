import { Component, OnInit } from "@angular/core";
import { Button } from "../components/button-list/button-list-item/button-list-item";
import {AccountButtonItem} from "./account-button-item";

@Component({
  selector: 'cash-account-list',
  templateUrl: './account-list.component.html'
})

export class AccountListComponent implements OnInit {
  buttons: Button[] = [];

  ngOnInit(): void {
    this.buttons.push(new AccountButtonItem('Current', '-20.00'));
    this.buttons.push(new AccountButtonItem('Online Savings', '2000.00'));
    this.buttons.push(new AccountButtonItem('Credit Card', '0.00'));
  }
}
