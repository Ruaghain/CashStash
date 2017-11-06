import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AccountEditComponent } from './account-edit.component';
import { AccountService } from '../account-service/account.service';
import { ActivatedRoute, ActivatedRouteStub, Router, RouterStub } from '../../../testing';
import { ACCOUNTS, FakeAccountService } from '../../../testing/services/fake-account.service';
import { Account } from '../account.model';
import { WraithModule } from '../../components/wraith.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

let activatedRoute: ActivatedRouteStub;
let fixture: ComponentFixture<AccountEditComponent>;

describe('AccountEditComponent', () => {

  let fakeAccountService: FakeAccountService;
  let fakeRouter: RouterStub;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  describe('Editing account information', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          HttpClientTestingModule,
          WraithModule
        ],
        declarations: [
          AccountEditComponent
        ],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRoute },
          { provide: AccountService, useClass: FakeAccountService },
          { provide: Router, useClass: RouterStub }
        ]
      }).compileComponents();

      fakeAccountService = TestBed.get(AccountService);
      fakeRouter = TestBed.get(Router);
    }));

    describe('for an existing account', () => {
      const firstAccount = ACCOUNTS[0];
      let expectedAccount: Account;
      beforeEach(async(() => {
        expectedAccount = firstAccount;
        activatedRoute.testParams = { account: expectedAccount };
        createComponent();
      }));

      it('displays edit form for accounts', () => {
        let form = fixture.debugElement.query(By.css('form'));
        expect(form).toBeDefined();
      });

      it('correctly populates relevant data', () => {
        let expectedData = [
          { field: 'name', value: 'Current' },
          { field: 'number', value: '123456789' },
          { field: 'openingBalance', value: '200' },
          { field: 'balance', value: '300' }
        ];
        expectedData.forEach((a) => {
          let element = fixture.debugElement.query(By.css(`#${a.field}`)).nativeElement;
          expect(element.value).toEqual(a.value);
        });
      });

      it('updates the existing account', () => {
        spyOn(fakeAccountService, 'updateAccount').and.callThrough();
        let form = fixture.debugElement.query(By.css('form'));
        form.triggerEventHandler('submit', null);
        expect(fakeAccountService.updateAccount).toHaveBeenCalled();
      });

      it('correctly navigates to account list', () => {
        spyOn(fakeRouter, 'navigateByUrl').and.callThrough();
        let form = fixture.debugElement.query(By.css('form'));
        form.triggerEventHandler('submit', null);
        expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith('/accounts');
      });

      describe('#delete', () => {
        it('displays a delete button', () => {
          let deleteButton = fixture.debugElement.query(By.css('.cash-delete'));
          expect(deleteButton).toBeDefined();
        });

        it('deletes the account', () => {
          spyOn(fakeAccountService, 'deleteAccount').and.callThrough();
          let deleteButton = fixture.debugElement.query(By.css('.cash-delete'));
          deleteButton.triggerEventHandler('click', null);
          expect(fakeAccountService.deleteAccount).toHaveBeenCalled();
        });

        it('correctly navigates to account list', () => {
          spyOn(fakeRouter, 'navigateByUrl').and.callThrough();
          let deleteButton = fixture.debugElement.query(By.css('.cash-delete'));
          deleteButton.triggerEventHandler('click', null);
          expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith('/accounts');
        });
      })
    });

    describe('for a new account', () => {
      beforeEach(async(() => {
        activatedRoute.testParams = { account: null };
        createComponent();
      }));

      it('does not display a delete button', () => {
        let deleteButton = fixture.debugElement.query(By.css('.cash-delete'));
        expect(deleteButton).toBeNull();
      });

      it('creates a new account', () => {
        // let fakeAccountService = TestBed.get(AccountService);
        spyOn(fakeAccountService, 'saveAccount').and.callThrough();

        let form = fixture.debugElement.query(By.css('form'));
        form.triggerEventHandler('submit', null);
        expect(fakeAccountService.saveAccount).toHaveBeenCalled();
      });

      it('correctly navigates to account list', () => {
        spyOn(fakeRouter, 'navigateByUrl').and.callThrough();
        let form = fixture.debugElement.query(By.css('form'));
        form.triggerEventHandler('submit', null);
        expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith('/accounts');
      });
    })
  });
});

function createComponent() {
  fixture = TestBed.createComponent(AccountEditComponent);
  // component = fixture.componentInstance;

  // 1st change detection triggers ngOnInit which gets an account
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched account
    fixture.detectChanges();
  });
}
