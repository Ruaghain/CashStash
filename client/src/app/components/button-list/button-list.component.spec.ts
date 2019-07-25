import {ButtonListComponent} from './button-list.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ButtonListItemComponent} from './button-list-item/button-list-item.component';
import {ButtonListItem} from './button-list-item/button-list-item';
import {By} from '@angular/platform-browser';

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
    let buttonList: ButtonListItem[];
    let currentButton;
    let creditButton;

    beforeEach(() => {
      buttonList = [];
      currentButton = new ButtonListItem();
      currentButton.addLabel('Current');
      creditButton = new ButtonListItem();
      creditButton.addLabel('Credit Card');

      buttonList.push(currentButton);
      buttonList.push(creditButton);

      component.buttons = buttonList;

      fixture.detectChanges();
    });

    it('displays a list of buttons', () => {
      let buttonItems = fixture.nativeElement.querySelectorAll('.button-item');
      expect(buttonItems.length).toEqual(2, 'There should be buttons listed.');
      expect(buttonItems[0].innerText.trim()).toEqual('Current', 'The button name should be called "Current"');
      expect(buttonItems[1].innerText.trim()).toEqual('Credit Card', 'The button name should be called "Credit Card"');
    });

    it('emits clicked button information', () => {
      // let selectedButton: ButtonListItem;
      // component.buttonSelected.subscribe((button: ButtonListItem) => selectedButton = button);

      let buttonClick = fixture.debugElement.query(By.css('.button-item'));
      buttonClick.triggerEventHandler('click', null);
    });
  });
});
