import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

import { SignupComponent } from "./signup.component";

describe("SignupComponent", () => {
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declare the test component
      declarations: [SignupComponent],
    });
    fixture = TestBed.createComponent(SignupComponent);
    fixture.detectChanges();
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

});
