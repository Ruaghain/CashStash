import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { APP_BASE_HREF } from "@angular/common";
import { TopbarComponent } from "./topbar.component";
import { RouterTestingModule } from "@angular/router/testing";
import { DebugElement } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { HttpModule } from "@angular/http";
import { NavbarComponent } from "./navbar/navbar.component";

describe("TopbarComponent", () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;
  let authService: any;

  beforeEach(async(() => {

    class MockAuthService {
      public loggedIn = false;
      public isLoggedIn = () => {
        return this.loggedIn;
      };

      public getFullName() {
        return "One User";
      }
    }

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      declarations: [TopbarComponent, NavbarComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TopbarComponent);
      component = fixture.componentInstance;

      authService = TestBed.get(AuthService);

      fixture.detectChanges();
    });
  }));

  it('should be an instance of TopbarComponent', () => {
    expect(fixture.componentInstance instanceof TopbarComponent).toBe(true, 'should be of type TopbarComponent');
  });

  //TODO: Need to test for the actual route when the relevant item is clicked.
  it('should have a header name of "Cash Stash"', () => {
    debugElement = fixture.debugElement.query(By.css('.header'));
    element = debugElement.nativeElement;
    expect(element.textContent).toEqual('Cash Stash');
  });

  describe('user is not logged in', () => {
    let items: any;

    beforeEach(() => {
      authService.loggedIn = false;
      fixture.detectChanges();
      items = fixture.debugElement.queryAll(By.css('.item'));
    });

    it('displays two options when a user is not signed in', () => {
      let loggedOutItems = Array.prototype.slice.call(items);
      expect(loggedOutItems.length).toBe(2, 'There should be two options for users who are not signed in.');
    });

    it('displays the "Sign In" and "Sign Up" buttons if the user is not logged in', () => {
      expect(items[0].nativeElement.innerText).toEqual('Sign Up');
      expect(items[1].nativeElement.innerText).toEqual('Login');
    });

    it('does not display the navigation bar', () => {
      let nav = fixture.debugElement.query(By.css('.cash-navigation'));
      expect(nav).toBeNull();
    });
  });

  describe('user logged in', () => {
    let items: any;

    beforeEach(() => {
      authService.loggedIn = true;
      fixture.detectChanges();
      items = fixture.debugElement.queryAll(By.css('.item'));
    });

    it('displays a logout option', () => {
      expect(items[0].nativeElement.innerText).toBe('Logout', 'There should be a "Logout" option displayed to the user.');
    });

    it('displays the users full name', () => {
      expect(items[1].nativeElement.innerText).toBe('One User', 'The users full name should be displayed in the top bar.');
    });

    it('displays the navigation bar', () => {
      let nav = fixture.debugElement.query(By.css('.cash-navigation'));
      expect(nav).toBeDefined();
    });

  });

});
