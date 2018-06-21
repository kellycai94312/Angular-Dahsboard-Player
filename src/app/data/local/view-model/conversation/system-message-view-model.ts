import {Message} from '../../../remote/model/chat/message/message';
import {TranslateService} from '@ngx-translate/core';
import {ISubscription} from 'rxjs/Subscription';
import {Person} from '../../../remote/model/person';
import {AppModule} from '../../../../app.module';
import {BaseViewModel} from '../base/base-view-model';
import {SystemMessageContentType} from '../../../remote/model/chat/message/system-message-content-type';
import {BaseMessageContentType} from '../../../remote/model/chat/message/base/base-message-content-type';
import {SystemMessageContent} from '../../../remote/model/chat/message/system-message-content';

export class SystemMessageViewModel extends BaseViewModel<Message> {

  title: string;
  body: string;
  data: Message;

  private readonly _translateService: TranslateService;
  private readonly _translateServiceSubscription: ISubscription;

  constructor(data: Message) {
    super(data);

    this._translateService = AppModule.injector.get(TranslateService);
    this._translateServiceSubscription = this._translateService.onLangChange.subscribe(async x => {
      await this.build();
    });
  }

  public async build(): Promise<void> {

    let sender = this.getPersonLink(this.data.sender.person);

    switch (this.data.content.discriminator) {
      case BaseMessageContentType.MESSAGE_CONTENT:
        this.body = this.data.content.content;
        break;
      case BaseMessageContentType.SYSTEM_MESSAGE_CONTENT:

        const messageContent = <SystemMessageContent> this.data.content;
        switch (messageContent.systemMessageType) {
          case SystemMessageContentType.CREATE_CHAT:
            this.body = await this._translateService.get('conversationSystemMessage.createChat', {
              sender: sender
            }).toPromise();
            break;
          case SystemMessageContentType.UPDATE_NAME:
            this.body = await this._translateService.get('conversationSystemMessage.updateName', {
              sender: sender
            }).toPromise();
            break;
          case SystemMessageContentType.UPDATE_LOGO:
            this.body = await this._translateService.get('conversationSystemMessage.updateLogo', {
              sender: sender
            }).toPromise();
            break;
          case SystemMessageContentType.QUIT_PARTICIPANT:
            this.body = await this._translateService.get('conversationSystemMessage.quitParticipant', {
              sender: sender
            }).toPromise();
            break;
          case SystemMessageContentType.ADD_PARTICIPANT:
            this.body = await this._translateService.get('conversationSystemMessage.addParticipant', {
              person: this.getPersonObject(messageContent),
              sender: sender
            }).toPromise();
            break;
          case SystemMessageContentType.DELETE_PARTICIPANT:
            this.body = await this._translateService.get('conversationSystemMessage.deleteParticipant', {
              person: this.getPersonObject(messageContent),
              sender: sender
            }).toPromise();
        }
    }

  }

  private getPersonObject(messageContent: SystemMessageContent) {
    return this.getPersonLink(messageContent.object.person);
  }

  public unsubscribe(): void {
    this._translateServiceSubscription.unsubscribe();
  }

  public getPersonLink(person: Person): string {
    return `<a class="link" link="/person/${person.id}">${person.firstName} ${person.lastName}</a>`;
  }

}
