import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonListItemComponent } from './button-list-item.component';
import { ButtonListItem } from './button-list-item';

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
    //let button = fixture.nativeElement.querySelector('.button-name');
  });
});
