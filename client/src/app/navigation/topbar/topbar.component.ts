import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'cash-topbar',
  styleUrls: ['topbar.component.scss'],
  templateUrl: 'topbar.component.html'
})

export class TopbarComponent extends OnInit {
  private headerUserLoggedIn: boolean;
  private headerUserFullName: string;

  ngOnInit(): void {
    this.setUserLoggedIn(false);
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
