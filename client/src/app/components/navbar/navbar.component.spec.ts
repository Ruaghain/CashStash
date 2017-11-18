import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { APP_BASE_HREF } from "@angular/common";
import { HttpModule } from "@angular/http";
import { NavbarComponent } from "./navbar.component";
import { AuthService } from "../../auth/auth-service/auth.service";

describe("NavbarComponent", () => {

  // let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let element: HTMLElement;
  let authService: any;

  beforeEach(async(() => {
    class MockAuthService {
      public loggedIn = false;
      public isLoggedIn = () => {
        return this.loggedIn;
      }
    }

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      declarations: [NavbarComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NavbarComponent);
      // component = fixture.componentInstance;

      authService = TestBed.get(AuthService);

      fixture.detectChanges();
    });
  }));

  it('should be an instance of NavigationComponent', () => {
    expect(fixture.componentInstance instanceof NavbarComponent).toBe(true, 'should be of type NavigationComponent');
  });

  //TODO: Need to test for the actual route when the relevant item is clicked.
  describe('user not logged in', () => {
    beforeEach(() => {
      authService.loggedIn = false;
      fixture.detectChanges();
    });

    it('should not display the navigation bar', () => {
      element = fixture.nativeElement.querySelector('nav>div');
      expect(element).toBeNull();
    });
  });

  describe('user is logged in', () => {

    beforeEach(() => {
      authService.loggedIn = true;
      fixture.detectChanges();
    });

    it('should display the navigation bar', () => {
      element = fixture.nativeElement.querySelector('nav>div');
      expect(element).toBeDefined('The navigation component should be displayed if user is logged in.');
    });

    it('should display four list items', () => {
      element = fixture.nativeElement.querySelectorAll('ul>li');
      let navigationItems = Array.prototype.slice.call(element);
      expect(navigationItems.length).toEqual(4, 'There should be four list items displayed.');
    });

    it('should display the correct item names', () => {
      element = fixture.nativeElement.querySelectorAll('ul>li>a');
      let navigationItems = Array.prototype.slice.call(element);
      expect(navigationItems[0].innerText).toEqual('Dashboard', 'The first item in the list should be called "Dashboard"');
      expect(navigationItems[1].innerText).toEqual('Accounts', 'The second item in the list should be called "Accounts"');
      expect(navigationItems[2].innerText).toEqual('Reports', 'The third item in the list should be called "Reports"');
      expect(navigationItems[3].innerText).toEqual('Administration', 'The fourth item in the list should be called "Administration"');
    });
  })
});
