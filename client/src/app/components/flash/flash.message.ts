export enum MessageType {
  SUCCESS,
  INFORMATION,
  ERROR
}

export interface FlashMessageType {
  type: MessageType,
  message: string,
  timeout: number
}

export class FlashMessage implements FlashMessageType {
  type: MessageType = MessageType.ERROR;
  message: string;
  timeout: number = 0;

  constructor(message: string, type?: MessageType, timeout?: number) {
    this.type = type;
    this.message = message;
    this.timeout = timeout;
  }
}
