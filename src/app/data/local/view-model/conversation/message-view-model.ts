import {Message} from '../../../remote/model/chat/message/message';
import {SubscriptionLike as ISubscription} from 'rxjs';
import {AppModule} from '../../../../app.module';
import {BaseViewModel} from '../base/base-view-model';
import {SystemMessageType} from '../../../remote/model/chat/message/system-message-type';
import {MessageContentType} from '../../../remote/model/chat/message/base/message-content-type';
import {SystemMessageContent} from '../../../remote/model/chat/message/system-message-content';
import {MessageContent} from '../../../remote/model/chat/message/message-content';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {HtmlService} from '../../../../service/html/html.service';

export class MessageViewModel extends BaseViewModel<Message> {

  title: string;
  body: string;
  data: Message;

  private readonly _translateObjectService: TranslateObjectService;
  private readonly _htmlService: HtmlService;
  private readonly _translateServiceSubscription: ISubscription;

  constructor(data: Message) {
    super(data);

    this._translateObjectService = AppModule.injector.get(TranslateObjectService);
    this._htmlService = AppModule.injector.get(HtmlService);
    this._translateServiceSubscription = this._translateObjectService.langSubject.subscribe(async x => {
      await this.build();
    });
  }

  public async build(): Promise<void> {
    const sender = this._htmlService.getPersonLinkTag(this.data.sender.person);
    switch (this.data.content.discriminator) {
      case MessageContentType.MESSAGE_CONTENT:
        this.body = (this.data.content as MessageContent).content;
        break;
      case MessageContentType.SYSTEM_MESSAGE_CONTENT:
        const messageContent = <SystemMessageContent>this.data.content;
        switch (messageContent.systemMessageType) {
          case SystemMessageType.CREATE_CHAT:
            this.body = await this._translateObjectService.getTranslation('conversationSystemMessage.createChat', {
              sender: sender
            });
            break;
          case SystemMessageType.UPDATE_NAME:
            this.body = await this._translateObjectService.getTranslation('conversationSystemMessage.updateName', {
              sender: sender
            });
            break;
          case SystemMessageType.UPDATE_LOGO:
            this.body = await this._translateObjectService.getTranslation('conversationSystemMessage.updateLogo', {
              sender: sender
            });
            break;
          case SystemMessageType.QUIT_PARTICIPANT:
            this.body = await this._translateObjectService.getTranslation('conversationSystemMessage.quitParticipant', {
              sender: sender
            });
            break;
          case SystemMessageType.ADD_PARTICIPANT:
            this.body = await this._translateObjectService.getTranslation('conversationSystemMessage.addParticipant', {
              person: this._htmlService.getPersonLinkTag(messageContent.object.person),
              sender: sender
            });
            break;
          case SystemMessageType.DELETE_PARTICIPANT:
            this.body = await this._translateObjectService.getTranslation('conversationSystemMessage.deleteParticipant', {
              person: this._htmlService.getPersonLinkTag(messageContent.object.person),
              sender: sender
            });
            break;
        }
        break;
      case MessageContentType.EVENT_MESSAGE_CONTENT:
        // TODO:
        // this.body = await this._htmlService.getEventPreview((this.data.content as EventMessageContent<BaseTraining>).training);
        break;
    }
  }

  public unsubscribe(): void {
    this._translateServiceSubscription.unsubscribe();
  }

}
