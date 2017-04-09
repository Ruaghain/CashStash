import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AuthSignInComponent } from './auth-signin.component';
import { AuthService } from '../auth-service/auth.service';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { FlashService } from '../../components/flash/flash.service';

describe('SignInComponent', () => {
  let fixture: ComponentFixture<AuthSignInComponent>;

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
      declarations: [AuthSignInComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        AuthService,
        FlashService
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AuthSignInComponent);
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
