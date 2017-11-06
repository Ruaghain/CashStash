import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthSignUpComponent } from './auth-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';
import { FlashService } from '../../components/flash/flash.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe("SignupComponent", () => {
  let fixture: ComponentFixture<AuthSignUpComponent>;

  let mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [AuthSignUpComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        AuthService,
        FlashService
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AuthSignUpComponent);
      fixture.detectChanges();
    });
  }));

  it('should display a form to register', () => {
    let form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeDefined();
  });

  it('has the correct title', () => {
    let headingElement = fixture.debugElement.query(By.css('h2'));
    let nativeElement = headingElement.nativeElement;
    expect(nativeElement.textContent).toEqual("Register");
  });

  //TODO:Need to expand on this test to include the other fields.
});
