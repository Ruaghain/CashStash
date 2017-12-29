import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WraithRestDatasource } from './wraith.rest.datasource';

describe('WraithRestDataSource', () => {

  // let wraithRestDataSource: WraithRestDatasource<Account>;
  // let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [WraithRestDatasource]
    });
    // httpMock = TestBed.get(HttpTestingController);
    // wraithRestDataSource = TestBed.get(WraithRestDatasource)
  }));

  describe('insert', () => {
    // const mockAccount = new Account('Current', '1234567', 123.45, 456.65);
    // it('will add a record of the correct type', (done) => {
    //   wraithRestDataSource.insert(mockAccount).subscribe((account) => {
    //     expect(account.name).toEqual('Current');
    //     done();
    //   });
    //
    //   const request = httpMock.expectOne((test) => {
    //     console.log('This is the restult: ' + JSON.stringify(test));
    //   });
    //   expect(request.request.method).toEqual('GET');
    //
    //   request.flush({
    //     result: [{
    //       name: 'Current',
    //       number: '123456'
    //     }]
    //   })
    // });
  })
});
