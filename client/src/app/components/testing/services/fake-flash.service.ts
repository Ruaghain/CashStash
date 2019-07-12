import {FlashService} from '../../flash/flash.service';
import {FlashMessageType} from '../../flash/flash.message';
import {Observable, of} from 'rxjs';

export class FakeFlashService extends FlashService {

  error(message: string): void {
  }

  information(message: string): void {
  }

  success(message: string): void {
  }

  getFlashMessage(): Observable<FlashMessageType> {
    return of();
  }
}
