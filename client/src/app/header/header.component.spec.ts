import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  }));

  it('should display a form to register', () => {
    let navbar = fixture.debugElement.query(By.css('navbar'));
    console.log(navbar);
    expect(navbar).toBeDefined();
  });
});

// import { TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// describe('App', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({ declarations: [AppComponent]});
//   });
//   it ('should work', () => {
//     let fixture = TestBed.createComponent(AppComponent);
//     expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
//   });
// });
