export class ClientError implements Error {

  message: string;
  name: string;
  stack: string;
  messageKey: string;

  constructor(messageKey: string) {
    this.messageKey = messageKey;
  }

}
