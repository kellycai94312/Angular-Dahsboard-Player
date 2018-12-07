import {Message} from '../../../remote/model/chat/message/message';
import {ISubscription} from 'rxjs/Subscription';
import {AppModule} from '../../../../app.module';
import {BaseViewModel} from '../base/base-view-model';
import {SystemMessageContentType} from '../../../remote/model/chat/message/system-message-content-type';
import {BaseMessageContentType} from '../../../remote/model/chat/message/base/base-message-content-type';
import {SystemMessageContent} from '../../../remote/model/chat/message/system-message-content';
import {MessageContent} from '../../../remote/model/chat/message/message-content';
import {EventMessageContent} from '../../../remote/model/chat/message/event-message-content';
import {BaseTraining} from '../../../remote/model/training/base/base-training';
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
      case BaseMessageContentType.MESSAGE_CONTENT:
        this.body = (this.data.content as MessageContent).content;
        break;
      case BaseMessageContentType.SYSTEM_MESSAGE_CONTENT:
        const messageContent = <SystemMessageContent> this.data.content;
        switch (messageContent.systemMessageType) {
          case SystemMessageContentType.CREATE_CHAT:
            this.body = await this._translateObjectService.getTranslation('conversationSystemMessage.createChat', {
              sender: sender
            });
            break;
          case SystemMessageContentType.UPDATE_NAME:
            this.body = await this._translateObjectService.getTranslation('conversationSystemMessage.updateName', {
              sender: sender
            });
            break;
          case SystemMessageContentType.UPDATE_LOGO:
            this.body = await this._translateObjectService.getTranslation('conversationSystemMessage.updateLogo', {
              sender: sender
            });
            break;
          case SystemMessageContentType.QUIT_PARTICIPANT:
            this.body = await this._translateObjectService.getTranslation('conversationSystemMessage.quitParticipant', {
              sender: sender
            });
            break;
          case SystemMessageContentType.ADD_PARTICIPANT:
            this.body = await this._translateObjectService.getTranslation('conversationSystemMessage.addParticipant', {
              person: this._htmlService.getPersonLinkTag(messageContent.object.person),
              sender: sender
            });
            break;
          case SystemMessageContentType.DELETE_PARTICIPANT:
            this.body = await this._translateObjectService.getTranslation('conversationSystemMessage.deleteParticipant', {
              person: this._htmlService.getPersonLinkTag(messageContent.object.person),
              sender: sender
            });
            break;
        }
        break;
      case BaseMessageContentType.EVENT_MESSAGE_CONTENT:
        this.body = await this._htmlService.getEventPreview((this.data.content as EventMessageContent<BaseTraining>).training);
        break;
    }
  }

  public unsubscribe(): void {
    this._translateServiceSubscription.unsubscribe();
  }

}
