import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { SignInComponent } from "./signin.component";
import { AuthService } from "../auth/auth.service";
import { HttpModule } from "@angular/http";
import { Router } from "@angular/router";

describe('SignInComponent', () => {
  let fixture: ComponentFixture<SignInComponent>;

  let mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      declarations: [SignInComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        AuthService
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SignInComponent);
      fixture.detectChanges();
    })
  }));

  it('should display a form to sign in', () => {
    let form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeDefined();
  });

  it('has the correct title', () => {
    let headingElement = fixture.debugElement.query(By.css('h2'));
    let nativeElement = headingElement.nativeElement;
    expect(nativeElement.textContent).toEqual("Sign In");
  });

  it('has a username input field', () => {
    let username = fixture.debugElement.query(By.css('#username'));
    expect(username).toBeDefined();
  });

  it('has a password input field', () => {
    let password = fixture.debugElement.query(By.css('#password'));
    expect(password).toBeDefined();
  });
});
