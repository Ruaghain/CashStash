import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

import { SignUpComponent } from "./signup.component";

describe("SignupComponent", () => {
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
    });
    fixture = TestBed.createComponent(SignUpComponent);
    fixture.detectChanges();
  }));

  it('should display a form to register', () => {
    let form = fixture.debugElement.query(By.css('form'));
    console.log(form);
    expect(form).toBeDefined();

  });

  it('has the correct title', () => {
    let headingElement = fixture.debugElement.query(By.css('h2'));
    let nativeElement = headingElement.nativeElement;
    expect(nativeElement.textContent).toEqual("Register");
  });

});
