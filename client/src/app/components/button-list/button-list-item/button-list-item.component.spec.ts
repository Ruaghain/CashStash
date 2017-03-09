import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { ButtonListItemComponent } from "./button-list-item.component";
import { ButtonListItem } from "./button-list-item";

describe("ButtonListItemComponent", () => {

  let component: ButtonListItemComponent;
  let fixture: ComponentFixture<ButtonListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ButtonListItemComponent
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ButtonListItemComponent);
      component = fixture.componentInstance;
      component.button = new ButtonListItem('Current');
      fixture.detectChanges();
    });
  }));

  it('is an instance of ButtonListItemComponent', () => {
    expect(component instanceof ButtonListItemComponent).toBe(true, 'should be an instance of ButtonItemComponent');
  });

  it('should display name of provided button', () => {
    let button = fixture.nativeElement.querySelector('.button-name');
    expect(button.innerText).toEqual('Current');
  });

  describe('innerHtml', () => {

    beforeEach(() => {
      class HtmlButton extends ButtonListItem {
        constructor(public name: string, public html: string) {
          super(name);
          this.innerHtml = html;
        }
      }
      component.button = new HtmlButton('Credit Card', `<div>This is extra html</div>`);
      fixture.detectChanges();
    });

    it('displays the button name', () => {
      let buttonName = fixture.nativeElement.querySelector('.button-name');
      expect(buttonName.innerText).toEqual('Credit Card');
    });

    it('displays the button html', () => {
      let buttonHtml = fixture.nativeElement.querySelector('.button-custom-content');
      expect(buttonHtml.innerText).toEqual('This is extra html');
    });
  })
});
