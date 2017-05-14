import { EventEmitter, Injectable, Output } from '@angular/core';
import { FlashMessage, FlashMessageType, MessageType } from '../components/flash/flash.message';

@Injectable()
export class ErrorService {

  @Output()
  flashMessage: EventEmitter<FlashMessageType> = new EventEmitter<FlashMessageType>();

  public error(message: string) {
    let flashMessage = new FlashMessage(message, MessageType.ERROR);
    this.flashMessage.emit(flashMessage);
  }

  public information(message: string) {
    let flashMessage = new FlashMessage(message, MessageType.INFORMATION);
    this.flashMessage.emit(flashMessage);
  }

  public success(message: string) {
    let flashMessage = new FlashMessage(message, MessageType.SUCCESS);
    this.flashMessage.emit(flashMessage);
  }
}
