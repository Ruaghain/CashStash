import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { ButtonItemComponent } from "./button-list-item.component";
import { Button } from "./button-list-item";

describe("ButtonListComponent", () => {

  let component: ButtonItemComponent;
  let fixture: ComponentFixture<ButtonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ButtonItemComponent
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ButtonItemComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should be an instance of ButtonListComponent', () => {
    expect(component instanceof ButtonItemComponent).toBe(true, 'should be an instance of ButtonItemComponent');
  });

  it('should display name of provided button', () => {
    component.button = new Button('Current');
    fixture.detectChanges();

    let button = fixture.nativeElement.querySelector('.button-name');
    expect(button.innerText).toEqual('Current');
  });

});
