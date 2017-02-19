import { Component } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'cash-topbar',
  styleUrls: ['topbar.component.scss'],
  templateUrl: 'topbar.component.html'
})

export class TopbarComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  isUserLoggedIn = () => {
    return this.authService.isLoggedIn();
  };

  userFullName = () => {
    return this.authService.getFullName();
  };

  logout = () => {
    this.authService.logout();
    this.router.navigateByUrl('/')
  }
}
