import { Component, OnInit } from "@angular/core";
import { Button } from "../components/button-list/button-list-item/button-list-item";

@Component({
  selector: 'cash-account-list',
  templateUrl: './account-list.component.html'
})

export class AccountListComponent implements OnInit {
  buttons: Button[] = [];

  ngOnInit(): void {
    this.buttons.push(new Button('Current'));
    this.buttons.push(new Button('Online Savings'));
    this.buttons.push(new Button('Credit Card'));
  }
}
