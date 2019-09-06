import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {MessageContentType} from '../../../../data/remote/model/chat/message/base';
import {Message, MessageContent} from '../../../../data/remote/model/chat/message';
import {Person} from '../../../../data/remote/model/person';
import {AppHelper} from '../../../../utils/app-helper';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageItemComponent {

  @Input()
  public message: Message;

  @Input()
  public person: Person;

  public readonly propertyConstantClass = PropertyConstant;
  public readonly messageContentTypeClass = MessageContentType;
  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;

  constructor(private _translateService: TranslateService,
              private _appHelper: AppHelper) {
  }

  public get messageStateText(): string {
    let text = '';
    let date = this.message.content.created;
    if (this.message.content instanceof MessageContent && this.message.content.updated) {
      text = `${this._translateService.instant('edited')} `;
      date = this.message.content.updated;
    }
    text += `${this._appHelper.dateByFormat(date, PropertyConstant.dateTimeFormat)}`;
    return text;
  }

  public get messageStateIcon(): string {
    if ((!this.message.read || (!(this.message.read && this.message.sender.person && this.person) && this.message.sender.person.id == this.person.id))) {
      return 'done';
    }
    return 'done_all';
  }

  public get myMessage(): boolean {
    return this.message.sender.person.id == this.person.id;
  }

}
