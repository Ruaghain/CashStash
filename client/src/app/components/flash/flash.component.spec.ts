import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashComponent } from './flash.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { FlashService } from './flash.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { RouterStub } from '../../../testing/router-stubs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FlashComponent', () => {
  let component: FlashComponent;
  let fixture: ComponentFixture<FlashComponent>;
  let localFlashService: FlashService;
  let debugElement: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpModule
      ],
      providers: [
        FlashService,
        { provide: Router, useClass: RouterStub }
      ],
      declarations: [
        FlashComponent
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(FlashComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement;
      element = debugElement.nativeElement;

      localFlashService = TestBed.get(FlashService);

      fixture.detectChanges();
    });
  }));

  it('is an instance of FlashComponent', () => {
    expect(component instanceof FlashComponent).toBe(true, 'should be of type FlashComponent');
  });

  it('is not visible initially', () => {
    expect(component.currentState()).toEqual('hide', 'Flash message should not be visible');
  });

  let messagesList = [
    { type: 'error', message: 'This is an error message', timeout: false },
    { type: 'information', message: 'This is an information message', timeout: true },
    { type: 'success', message: 'This is a success message', timeout: true }
  ];
  messagesList.forEach((messageItem) => {
    describe(messageItem.type, () => {
      beforeEach(() => {
        localFlashService[messageItem.type](messageItem.message);
        fixture.detectChanges();
      });

      it('message is visible', () => {
        expect(component.currentState()).toEqual('show', `Flash message should display a(n) ${messageItem.type} message`);
      });

      it('has the correct class name', () => {
        expect(debugElement.query(By.css('.flash-component')).nativeElement.classList.contains(messageItem.type)).toBeTruthy();
      });

      it('displays an error message', () => {
        expect(debugElement.query(By.css('span')).nativeElement.innerHTML).toEqual(messageItem.message);
      });

      if (!messageItem.timeout) {
        it('displays a close option', () => {
          expect(debugElement.query(By.css('close-btn'))).toBeDefined('Flash message should be closeable.')
        });
      }

      if (messageItem.timeout) {
        //it('message disappears after a few seconds', <any>fakeAsync((): void => {
        //  //advance(fixture);
        //  tick(10000);
        //  fixture.detectChanges();
        //  console.log(component.isFlashVisible());
        //  expect(component.isFlashVisible()).toBeFalsy();
        //}));
      }
    })
  });
});
