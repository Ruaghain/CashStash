import { Component } from "@angular/core";

@Component({
  selector: 'cash-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: 'header.component.html'
})

export class HeaderComponent {

  isUserLoggedIn: boolean;

  userLoggedIn = () => {
    return this.isUserLoggedIn;
  }
}
