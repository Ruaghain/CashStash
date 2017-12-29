import { async, TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
import { FlashService } from '../../components/flash/flash.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AccountService', () => {
  let accountService: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AccountService,
        FlashService
      ]
    });
    accountService = TestBed.get(AccountService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  describe('getAccounts()', () => {

    const mockResponse = {
      result: [
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
      ]
    };

    it('should return all of the accounts', (done) => {
      accountService.getAccounts().subscribe((accounts) => {
        expect(accounts.length).toEqual(2);
        expect(accounts[0].name).toEqual('Current');
        expect(accounts[0].number).toEqual('123456789');
        done();
      });

      const request = httpMock.expectOne('undefined/account');
      expect(request.request.method).toEqual('GET');

      request.flush(mockResponse);

      httpMock.verify();

    });
  });

  describe('getAccount()', () => {

    const mockResponse = {
      result: [
        {
          name: 'Current',
          number: '123456789',
          openingBalance: -200.00,
          balance: 100.00
        }
      ]
    };

    it('should return the required account', (done) => {
      accountService.getAccount('1').subscribe((account) => {
        expect(account.name).toEqual('Current');
        expect(account.number).toEqual('123456789');
        done();
      });

      const request = httpMock.expectOne('undefined/account/1');
      expect(request.request.method).toEqual('GET');

      request.flush(mockResponse);

      httpMock.verify();

    });
  });
});
