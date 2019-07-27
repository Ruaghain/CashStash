import {HttpHeaders} from '@angular/common/http';

export class WraithBaseRequest {

  // @ts-ignore
  protected baseUrl: string = process.env.SERVER_URL;

  protected getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`
    });
  }

  protected getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
