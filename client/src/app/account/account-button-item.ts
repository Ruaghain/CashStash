import { ButtonListItem } from "../components/button-list/button-list-item/button-list-item";

export class AccountButtonItem extends ButtonListItem {

  constructor(public name: string, public innerHtml: string) {
    super(name);
    this.innerHtml = innerHtml;
  }
}
