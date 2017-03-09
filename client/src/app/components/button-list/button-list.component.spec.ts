import { ButtonListComponent } from "./button-list.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { ButtonListItemComponent } from "./button-list-item/button-list-item.component";
import { ButtonListItem } from "./button-list-item/button-list-item";
import { By } from "@angular/platform-browser";

describe("ButtonListComponent", () => {

  let component: ButtonListComponent;
  let fixture: ComponentFixture<ButtonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ButtonListComponent,
        ButtonListItemComponent
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ButtonListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('is an instance of ButtonListComponent', () => {
    expect(component instanceof ButtonListComponent).toBe(true, 'should be an instance of ButtonListComponent');
  });

  describe('button functionality', () => {
    let buttonList: ButtonListItem[] = [];
    let currentButton;
    let creditButton;

    beforeEach(() => {
      currentButton = new ButtonListItem('Current');
      creditButton = new ButtonListItem('Credit Card');

      buttonList.push(currentButton);
      buttonList.push(creditButton);

      component.buttons = buttonList;

      fixture.detectChanges();
    });

    it('displays a list of buttons', () => {
      let buttonItems = fixture.nativeElement.querySelectorAll('button-item');
      expect(buttonItems.length).toEqual(2, 'There should be buttons listed.')
    });

    it('emits clicked button information', () => {
      let selectedButton: ButtonListItem;
      component.buttonSelected.subscribe((button: ButtonListItem) => selectedButton = button);

      let buttonClick = fixture.debugElement.query(By.css('.button-item'));
      buttonClick.triggerEventHandler('click', null);
      console.log(buttonClick.nativeElement);
    });
  });
});
