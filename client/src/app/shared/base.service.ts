import { Headers } from '@angular/http';

export class BaseService {

  protected baseUrl: string = process.env.SERVER_URL;

  protected getHeaders() {
    const token = localStorage.getItem('token');
    return new Headers({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`
    });
  }
}
