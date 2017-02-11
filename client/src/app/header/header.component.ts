import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'cash-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: 'header.component.html'
})

export class HeaderComponent extends OnInit {

  private headerUserLoggedIn: boolean;
  private headerUserFullName: string;

  ngOnInit(): void {
    this.setUserLoggedIn(true);
    this.setUserFullName("Rowan Massey");
  }

  //Will get the following from the authorisation service when it's created.
  setUserLoggedIn = (userLoggedIn: boolean) => {
    this.headerUserLoggedIn = userLoggedIn;
  };

  setUserFullName = (userFullName: string) => {
    this.headerUserFullName = userFullName;
  };

  isUserLoggedIn = () => {
    return this.headerUserLoggedIn;
  };

  userFullName = () => {
    return this.headerUserFullName;
  }
}
