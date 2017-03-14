import { async, TestBed, inject } from "@angular/core/testing";
import { AccountService } from "./account.service";
import { HttpModule, Http, BaseRequestOptions, ResponseOptions, Response } from "@angular/http";
import { MockBackend } from "@angular/http/testing";

describe("AccountService", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AccountService,
        {
          provide: Http,
          useFactory: (mockBackend: any, options: any) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
  }));

  describe("accounts()", () => {

    const mockResponse = [
      {
        name: 'Current',
        number: '123456789',
        openingBalance: -200.00,
        balance: 100.00
      },
      {
        name: 'Credit Card',
        number: '987654321',
        openingBalance: 0.00,
        balance: -500.00
      }
    ];

    it("should return all of the accounts", inject([AccountService, MockBackend], (accountService: any, mockBackend: any) => {
      mockBackend.connections.subscribe((connection: any) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      //TODO: should accounts reference an account model instead of any?
      accountService.accounts().subscribe((accounts: any) => {
        expect(accounts.length).toEqual(2);
        expect(accounts[0].name).toEqual('Current');
        expect(accounts[0].number).toEqual('123456789');
      })
    }))
  });
});
