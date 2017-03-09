import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonListItem } from "./button-list-item/button-list-item";

@Component({
  selector: 'wraith-button-list',
  templateUrl: './button-list.component.html'
})

export class ButtonListComponent {
  @Input() buttons: ButtonListItem[] = [];
  @Output() buttonSelected = new EventEmitter<ButtonListItem>();

  constructor() {
  };

  onButtonClick(button: ButtonListItem) {
    this.buttonSelected.emit(button);
  }
}
