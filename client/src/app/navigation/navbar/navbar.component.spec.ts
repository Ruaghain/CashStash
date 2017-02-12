import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { APP_BASE_HREF } from "@angular/common";
import { NavbarComponent } from "./navbar.component";
import { RouterTestingModule } from "@angular/router/testing";
import { NavigationItem } from "./navbar.item";

describe("HeaderComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [NavbarComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be an instance of NavigationComponent', () => {
    expect(fixture.componentInstance instanceof NavbarComponent).toBe(true, 'should be of type NavigationComponent');
  });

  //TODO: Need to test for the actual route when the relevant item is clicked.
  describe('user not logged in', () => {

    beforeEach(() => {
      component.setUserLoggedIn(false);
      fixture.detectChanges();
    });

    it('should not display the navigation bar', () => {
      element = fixture.nativeElement.querySelector('nav>div');
      expect(element).toBeNull();
    });
  });

  describe('user is logged in', () => {

    beforeEach(() => {
      component.setUserLoggedIn(true);
      component.addNavigationItem(new NavigationItem('Accounts', 'accounts'));
      component.addNavigationItem(new NavigationItem('Reports', 'reports'));
      fixture.detectChanges();
    });

    it('should display the navigation bar', () => {
      element = fixture.nativeElement.querySelector('nav>div');
      expect(element).toBeDefined('The navigation component should not be displayed if no user is logged in.');
    });

    it('should display two list items', () => {
      element = fixture.nativeElement.querySelectorAll('ul>li');
      let navigationItems = Array.prototype.slice.call(element);
      expect(navigationItems.length).toEqual(2, 'There should be two list items displayed.');
    });

    it('should display the correct item names', () => {
      element = fixture.nativeElement.querySelectorAll('ul>li>a');
      let navigationItems = Array.prototype.slice.call(element);
      expect(navigationItems[0].innerText).toEqual('Accounts', 'The first item in the list should be called "Accounts"');
      expect(navigationItems[1].innerText).toEqual('Reports', 'The second item in the list should be called "Reports"');
    });
  })
});
