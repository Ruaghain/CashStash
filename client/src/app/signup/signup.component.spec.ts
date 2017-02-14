import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { SignUpComponent } from "./signup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { HttpModule } from "@angular/http";

describe("SignupComponent", () => {
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      declarations: [SignUpComponent],
      providers: [
        AuthService
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(SignUpComponent);
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
