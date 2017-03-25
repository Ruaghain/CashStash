import { Component, Input } from "@angular/core";
import { ButtonListItem } from "./button-list-item";

@Component({
  selector: 'wraith-button-item',
  styleUrls: ['button-list-item.component.scss'],
  templateUrl: 'button-list-item.component.html'
})

export class ButtonListItemComponent {
  @Input() button: ButtonListItem;

  constructor() {
  };
}
