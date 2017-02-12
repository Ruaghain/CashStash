import { Component } from "@angular/core";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'cash-topbar',
  styleUrls: ['topbar.component.scss'],
  templateUrl: 'topbar.component.html'
})

export class TopbarComponent {

  constructor(private authService: AuthService) {
  }

  isUserLoggedIn = () => {
    return this.authService.isLoggedIn();
  };

  userFullName = () => {
    return this.authService.getFullName();
  }
}
