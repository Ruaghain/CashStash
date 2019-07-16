import {Injectable} from '@angular/core';
import {FlashMessage, FlashMessageType, MessageType} from './flash.message';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class FlashService {

  private messageSource = new Subject<FlashMessageType>();
  private messageObservable$ = this.messageSource.asObservable();

  public error(message: string): void {
    let flashMessage = new FlashMessage(message, MessageType.ERROR, 0);
    this.messageSource.next(flashMessage);
  }

  public information(message: string): void {
    let flashMessage = new FlashMessage(message, MessageType.INFORMATION, 5000);
    this.messageSource.next(flashMessage);
  }

  public success(message: string): void {
    let flashMessage = new FlashMessage(message, MessageType.SUCCESS, 5000);
    this.messageSource.next(flashMessage);
  }

  public getFlashMessage(): Observable<FlashMessageType> {
    return this.messageObservable$;
  }
}
