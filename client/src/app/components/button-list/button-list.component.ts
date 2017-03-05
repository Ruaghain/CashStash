import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Button } from "./button-list-item/button-list-item";

@Component({
  selector: 'wraith-button-list',
  templateUrl: './button-list.component.html'
})

export class ButtonListComponent {
  @Input() buttons: Button[] = [];
  @Output() buttonSelected = new EventEmitter<Button>();

  constructor() {
  };

  onButtonClick(button: Button) {
    this.buttonSelected.emit(button);
  }
}
