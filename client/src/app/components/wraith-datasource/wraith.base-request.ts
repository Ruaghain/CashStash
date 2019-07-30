import {HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";

export class WraithBaseRequest {

  protected baseUrl: string = environment.server_url;

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
