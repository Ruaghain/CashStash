import { Component, OnInit } from "@angular/core";
import { ButtonListItem } from "../components/button-list/button-list-item/button-list-item";

@Component({
  selector: 'cash-account-list',
  templateUrl: './account-list.component.html'
})

export class AccountListComponent implements OnInit {
  buttons: ButtonListItem[] = [];

  ngOnInit(): void {
    let currentButton = new ButtonListItem('Current');
    currentButton.addLabel('-20.00', 'indianred');
    this.buttons.push(currentButton);

    let onlineSavingButton = new ButtonListItem('Online Savings');
    onlineSavingButton.addLabel('2000.00', 'forestgreen');
    this.buttons.push(onlineSavingButton);

    let creditCardButton = new ButtonListItem('Credit Card');
    creditCardButton.addLabel('0.00', 'forestgreen');
    this.buttons.push(creditCardButton);
  }
}
