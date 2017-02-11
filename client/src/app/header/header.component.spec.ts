import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {APP_BASE_HREF} from "@angular/common";
import {HeaderComponent} from "./header.component";
import {RouterTestingModule} from "@angular/router/testing";
import {DebugElement} from "@angular/core";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [HeaderComponent],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });
  }));

  it('should be an instance of HeaderComponent', () => {
    expect(fixture.componentInstance instanceof HeaderComponent).toBe(true, 'should be of type HeaderComponent');
  });

  it('should have a brand name of "CashStash"', () => {
    debugElement = fixture.debugElement.query(By.css('.navbar-brand'));
    element = debugElement.nativeElement;
    expect(element.textContent).toEqual('CashStash');
  });

  it('should display the "Sign In" and "Sign Up" buttons if the user is not logged in', () => {
    component.setUserLoggedIn(false);
    fixture.detectChanges();
    debugElement = fixture.nativeElement.querySelectorAll('ol>li');
    let logoutItem = Array.prototype.slice.call(debugElement);
    expect(logoutItem.length).toBe(2, 'There should be a login and signup button displayed for a user who is no logged in.');
  });

  describe('user logged in', () => {

    beforeEach(() => {
      component.setUserLoggedIn(true);
      component.setUserFullName('One User');
      fixture.detectChanges();
    });

    it('should display the users full name', () => {
      element = fixture.nativeElement.querySelector('ol>li>a');
      expect(element.innerText).toBe('One User', 'There should only be a logout button displayed for a logged in user.');
    });

    it('should display two options in the dropdown', () => {
      element = fixture.nativeElement.querySelectorAll('ol>li>ul>li>a');
      let dropdownItems = Array.prototype.slice.call(element);
      expect(dropdownItems.length).toBe(2, 'There should only be two options in the logged in dropdown.');
      expect(dropdownItems[0].textContent).toBe('Administration', 'The first element should be "Administration"');
      expect(dropdownItems[1].textContent).toBe('Logout', 'The last element should be "Logout"');
    })
  });

});
