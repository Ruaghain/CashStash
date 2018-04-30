import { Component, OnInit } from "@angular/core";
import { NavigationItem } from "./navbar.item";
import { AuthService } from "../../auth/auth-service/auth.service";

@Component({
  selector: 'wraith-navbar',
  styleUrls: ['navbar.component.scss'],
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {

  private navItems: NavigationItem[] = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.addNavigationItem(new NavigationItem('Dashboard', 'dashboard'));
    this.addNavigationItem(new NavigationItem('Accounts', 'accounts'));
    this.addNavigationItem(new NavigationItem('Categories', 'category'));
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
