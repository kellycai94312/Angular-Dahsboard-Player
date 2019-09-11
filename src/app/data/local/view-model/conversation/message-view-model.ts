import {Message, MessageContent} from '../../../remote/model/chat/message';
import {SubscriptionLike as ISubscription} from 'rxjs';
import {AppModule} from '../../../../app.module';
import {BaseViewModel} from '../base/base-view-model';
import {MessageContentType} from '../../../remote/model/chat/message/base';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {HtmlService} from '../../../../service/html/html.service';
import {ConversationUtilService} from '../../../../services/conversation-util/conversation-util.service';

export class MessageViewModel extends BaseViewModel<Message> {

  title: string;
  body: string;
  data: Message;

  private readonly _translateObjectService: TranslateObjectService;
  private readonly _htmlService: HtmlService;
  private readonly _conversationUtilService: ConversationUtilService;
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
    switch (this.data.content.discriminator) {
      case MessageContentType.MESSAGE_CONTENT:
        this.body = (this.data.content as MessageContent).content;
        break;
      case MessageContentType.SYSTEM_MESSAGE_CONTENT:
        this.body = this._conversationUtilService.getSystemMessageContent(this.data);
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
