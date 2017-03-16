import { Component, Input } from "@angular/core";
import { ButtonListItem } from "../../components/button-list/button-list-item/button-list-item";

@Component({
  selector: 'cash-account-list',
  templateUrl: 'account-list.component.html'
})

export class AccountListComponent {
  @Input()
  buttons: ButtonListItem[];
}
