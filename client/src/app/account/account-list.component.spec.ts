import { AccountListComponent } from "./account-list.component";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { ButtonListComponent } from "../components/button-list/button-list.component";
import { ButtonListItemComponent } from "../components/button-list/button-list-item/button-list-item.component";
import { ButtonListItem } from "../components/button-list/button-list-item/button-list-item";
import { By } from "@angular/platform-browser";

describe("AccountListComponent", () => {

  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AccountListComponent,
        ButtonListComponent,
        ButtonListItemComponent
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AccountListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it("is an instance of AccountListComponent", () => {
    expect(component instanceof AccountListComponent).toBeTruthy('should be an instance of AccountListComponent');
  });


  describe("buttons", () => {

    let buttons: any;

    beforeEach(() => {
      let buttonsItems: ButtonListItem[] = [];

      buttonsItems.push(new ButtonListItem('Current'));
      buttonsItems.push(new ButtonListItem('Savings'));

      component.buttons = buttonsItems;
      fixture.detectChanges();

      buttons = fixture.debugElement.queryAll(By.css('.button-item'));
    });

    it('has two buttons defined', () => {
      expect(buttons.length).toEqual(2, 'There should be two account buttons defined');
    });

    it('have the correct titles', () => {
      console.log(buttons[0].debugElement);
      // expect(renderdButtons[0]).toEqual('Current');
    });


  });
});
