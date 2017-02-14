import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { SignInComponent } from "./signin.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../auth/auth.service";

describe('SignInComponent', () => {
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [SignInComponent],
      providers: [
        AuthService
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SignInComponent);
      fixture.detectChanges();
    })
  }));

  it('should display a form to sign in', () => {

  })

});
