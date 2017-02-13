import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { APP_BASE_HREF } from "@angular/common";
import { TopbarComponent } from "./topbar.component";
import { RouterTestingModule } from "@angular/router/testing";
import { DebugElement } from "@angular/core";
import {AuthService} from "../../auth/auth.service";
import {HttpModule} from "@angular/http";

describe("TopbarComponent", () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      declarations: [TopbarComponent],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        AuthService
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TopbarComponent);
      component = fixture.componentInstance;

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
      fixture.detectChanges();
      items = fixture.debugElement.queryAll(By.css('.item'));
    });

    it('should display two options when a user is not signed in', () => {
      let loggedOutItems = Array.prototype.slice.call(items);
      expect(loggedOutItems.length).toBe(2, 'There should be two options for users who are not signed in.');
    });

    it('should display the "Sign In" and "Sign Up" buttons if the user is not logged in', () => {
      expect(items[0].nativeElement.innerText).toEqual('Sign Up');
      expect(items[1].nativeElement.innerText).toEqual('Login');
    });
  });

  describe('user logged in', () => {
    let items: any;

    beforeEach(() => {
      fixture.detectChanges();
      items = fixture.debugElement.queryAll(By.css('.item'));
    });

    it('should display a logout option', () => {
      expect(items[0].nativeElement.innerText).toBe('Logout', 'There should be a "Logout" option displayed to the user.');
    });

    it('should display the users full name', () => {
      expect(items[1].nativeElement.innerText).toBe('One User', 'The users full name should be displayed in the top bar.');
    });

  });

});
