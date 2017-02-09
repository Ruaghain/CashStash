import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { APP_BASE_HREF } from '@angular/common';
import { HeaderComponent } from "./header.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("HeaderComponent", () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [HeaderComponent],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HeaderComponent);
      fixture.detectChanges();
    });
  }));

  it('should be an instance of HeaderComponent', () => {
    expect(fixture.componentInstance instanceof HeaderComponent).toBe(true, 'should be of type HeaderComponent');
  });

  it('should have a brand name', () => {
    let brandName = fixture.debugElement.query(By.css('.navbar-brand'));
    expect(brandName.nativeElement.textContent).toEqual('CashStash');
  });
});
