import { Component, OnInit } from "@angular/core";
import { NavigationItem } from "./navbar.item";

@Component({
  selector: 'cash-header',
  styleUrls: ['navbar.component.scss'],
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent extends OnInit {

  private navUserLoggedIn: boolean = false;
  private navItems: NavigationItem[] = [];

  ngOnInit(): void {
    // this.setUserLoggedIn(true);
    // this.addNavigationItem(new NavigationItem('Accounts', 'accounts'));
    // this.addNavigationItem(new NavigationItem('Reports', 'reports'));
    // this.addNavigationItem(new NavigationItem('Administration', 'administration'));
  }

  //Will get the following from the authorisation service when it's created.
  setUserLoggedIn = (userLoggedIn: boolean) => {
    this.navUserLoggedIn = userLoggedIn;
  };

  isUserLoggedIn = () => {
    return this.navUserLoggedIn;
  };

  addNavigationItem = (item: NavigationItem) => {
    this.navItems.push(item);
  };

  navigationItems = () => {
    return this.navItems;
  };
}
