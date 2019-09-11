import {Component, Input} from '@angular/core';
import {ConversationWrapper} from '../../../../data/local/conversation-wrapper';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {AppHelper} from '../../../../utils/app-helper';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {MessageContent} from '../../../../data/remote/model/chat/message';
import {Chat, Dialogue} from '../../../../data/remote/model/chat/conversation';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {IdentifiedObject} from '../../../../data/remote/base/identified-object';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-conversation-item',
  templateUrl: './conversation-item.component.html',
  styleUrls: ['./conversation-item.component.scss']
})
export class ConversationItemComponent extends BaseComponent<ConversationWrapper> {

  @Input()
  public preview: boolean;

  public readonly imageTypeClass = ImageType;
  public conversationImageClazz: FileClass;
  public conversationImage: IdentifiedObject;
  public conversationName: string;

  constructor(private _appHelper: AppHelper,
              private _translateService: TranslateService,
              private _authorizationService: AuthorizationService) {
    super();
  }

  public get messageStateText(): string {
    let text = '';
    const message = this.data.messageWrapper.message;
    let date = message.content.created;
    if (message.content instanceof MessageContent && message.content.updated) {
      text = `${this._translateService.instant('edited')} `;
      date = message.content.updated;
    }
    text += `${this._appHelper.dateByFormat(date, PropertyConstant.dateTimeFormat)}`;
    return text;
  }

  public get messageContent(): string {
    const content = this.data.messageWrapper.message.content;
    if (content instanceof MessageContent) {
      return content.content;
    }
    return this._translateService.instant('attachedData');
  }

  public get messageStateIcon(): string {
    return this.data.messageWrapper.unread ? 'done' : 'done_all';
  }

  public get messageFrom(): string {
    const message = this.data.messageWrapper.message;
    const isYouSender = message.sender.person.id == this._authorizationService.session.person.id;
    if (message.content.baseConversation instanceof Dialogue) {
      if (isYouSender) {
        return this._translateService.instant('you');
      }
    } else {
      return this._appHelper.getPersonFullName(message.sender.person);
    }
    return void 0;
  }

  protected async initializeComponent(data: ConversationWrapper): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this._appHelper.tryLoad(async () => {
        const conversation = data.messageWrapper.message.content.baseConversation;
        if (conversation instanceof Dialogue) {
          this.conversationImageClazz = FileClass.PERSON;

          if (!data.messageWrapper.empty) {
            let person = data.messageWrapper.message.sender.person;
            if (this._authorizationService.session.person.id == data.messageWrapper.message.sender.person.id) {
              person = data.messageWrapper.message.receiver.person;
            }
            this.conversationImage = person;
            this.conversationName = this._appHelper.getPersonFullName(person);
          }
        } else if (conversation instanceof Chat) {
          this.conversationImageClazz = FileClass.CHAT;
          this.conversationImage = conversation;
          this.conversationName = conversation.name;
        }
      });
    }
    return result;
  }

}
