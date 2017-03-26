import { FakeAccountService } from "../../testing/services/fake-account.service";
import { ActivatedRouteStub, RouterStub } from "../../testing/router-stubs";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AccountComponent } from "./account.component";
import { Router } from "@angular/router";
import { AccountService } from "./account-service/account.service";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { WraithModule } from "../components/wraith.module";

let activatedRoute: ActivatedRouteStub;
let component: AccountComponent;
let fixture: ComponentFixture<AccountComponent>;

describe('AccountComponent', () => {
  let fakeAccountService: FakeAccountService;
  let fakeRouter: RouterStub;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  describe('Account list', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          HttpModule,
          WraithModule
        ],
        declarations: [
          AccountComponent
        ],
        providers: [
          { provide: AccountService, useClass: FakeAccountService },
          { provide: Router, useClass: RouterStub },
        ]
      }).compileComponents();

      fakeAccountService = TestBed.get(AccountService);
      fakeRouter = TestBed.get(Router);
    }));

    beforeEach(async(() => {
      createComponent();
    }));

    it('displays all the accounts', () => {
      let accountButtons = fixture.debugElement.queryAll(By.css('wraith-button-item'));
      expect(accountButtons.length).toEqual(3);
      let expectedAccount = [
        { name: 'Current', amount: 300 },
        { name: 'Credit Card', amount: -500 },
        { name: 'Savings', amount: 0.37 }
      ];
      expectedAccount.forEach((button, i) => {
        expect(accountButtons[i].componentInstance.button.associatedObject['name']).toEqual(expectedAccount[i].name);
        expect(accountButtons[i].componentInstance.button.associatedObject['balance']).toEqual(expectedAccount[i].amount);
      });
    });

    it('navigates to edit account page when clicked', () => {
      spyOn(fakeRouter, 'navigateByUrl').and.callThrough();
      let accountButton = fixture.debugElement.query(By.css('wraith-button-item'));
      let accountId = accountButton.componentInstance.button.associatedObject._id;
      accountButton.triggerEventHandler('click', null);
      expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith(`/accounts/${accountId}/edit`);
    });

    it('navigates to new account screen when add account button is clicked', () => {
      spyOn(fakeRouter, 'navigateByUrl').and.callThrough();
      let addAccountButton = fixture.debugElement.query(By.css('.cash-save'));
      addAccountButton.triggerEventHandler('click', null);
      expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith('/accounts/new');
    })
  });
});

function createComponent() {
  fixture = TestBed.createComponent(AccountComponent);
  component = fixture.componentInstance;

  // 1st change detection triggers ngOnInit which gets an account
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched account
    fixture.detectChanges();
  });
}
