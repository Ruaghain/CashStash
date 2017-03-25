import { Headers } from "@angular/http";

export class BaseService {

  protected baseUrl: string = 'http://localhost:3000/api/v1';

  protected getHeaders() {
    const token = localStorage.getItem('token');
    return new Headers({
      'Content-Type': 'application/json',
      'x-access-token': `${token}`
    });
  }
}
