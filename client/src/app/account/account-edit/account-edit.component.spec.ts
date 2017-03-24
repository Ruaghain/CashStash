import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountEditComponent } from './account-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AccountService } from '../account-service/account.service';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

describe('AccountEditComponent', () => {

    let component: AccountEditComponent;
    let fixture: ComponentFixture<AccountEditComponent>;

    let mockRouter = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    let mockActivatedRoute = {
      snapshot: {
        data: {}
      }
    };

    //https://angular.io/docs/ts/latest/guide/testing.html#!#detect-changes
    function createComponent() {
      fixture = TestBed.createComponent(AccountEditComponent);
      component = fixture.componentInstance;

      // 1st change detection triggers ngOnInit which gets a hero
      fixture.detectChanges();
      return fixture.whenStable().then(() => {
        // 2nd change detection displays the async-fetched hero
        fixture.detectChanges();
      });
    }

    //This is an asynchronous beforeEach to load the external templates
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          HttpModule
        ],
        declarations: [AccountEditComponent],
        providers: [
          { provide: Router, useValue: mockRouter },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          AccountService
        ]
      });
    }));

    //This is the synchronous beforeEach. This will wait for the asynchronous beforeEach to complete.
    beforeEach(() => {
      fixture = TestBed.createComponent(AccountEditComponent);
      component = fixture.componentInstance;
    });

    it('will display an edit form for accounts', () => {
      let form = fixture.debugElement.query(By.css('form'));
      expect(form).toBeDefined();
    });

    describe('updates existing account', () => {
      beforeEach(() => {
        mockActivatedRoute = {
          snapshot: {
            data: {
              account: {
                name: 'test',
                number: '123456789',
                openingBalance: 200.00,
                balance: -500.00
              }
            }
          }
        };
        //fixture.detectChanges();
      });

      it('correctly populates relevant data', () => {
        console.log(fixture.nativeElement);
        console.log(fixture.debugElement.query(By.css('#name')).nativeElement);
        console.log(fixture.debugElement.query(By.css('#name')).nativeElement.innerText);
        //expect().innerText.trim()).toEqual('test')
      });
    });

    describe('creates a new account', () => {
      beforeEach(() => {
        mockActivatedRoute = {
          snapshot: {
            data: {}
          }
        };
        fixture.detectChanges();
      });

      it('does not populate', () => {
      });
    })
  }
);
