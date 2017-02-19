import { Component, OnInit } from "@angular/core";
import { NavigationItem } from "./navbar.item";
import { AuthService } from "../../../auth/auth.service";

@Component({
  selector: 'cash-navbar',
  styleUrls: ['navbar.component.scss'],
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent extends OnInit {

  private navItems: NavigationItem[] = [];

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.addNavigationItem(new NavigationItem('Accounts', 'accounts'));
    this.addNavigationItem(new NavigationItem('Reports', 'reports'));
    this.addNavigationItem(new NavigationItem('Administration', 'administration'));
  }

  isUserLoggedIn = () => {
    return this.authService.isLoggedIn();
  };

  addNavigationItem = (item: NavigationItem) => {
    this.navItems.push(item);
  };

  navigationItems = () => {
    return this.navItems;
  };
}
