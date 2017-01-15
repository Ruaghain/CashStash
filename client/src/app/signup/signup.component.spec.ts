import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { SignupComponent } from "./signup.component";

describe("SignupComponent", () => {
  let comp: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent], // declare the test component
    });

    fixture = TestBed.createComponent(SignupComponent);

    comp = fixture.componentInstance; // SignupComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('has the correct title', () => {
    expect(el.textContent).toEqual("We're signing up.");
  });

});
