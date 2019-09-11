import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BaseComponent} from '../../../../../data/local/component/base/base-component';
import {Message} from '../../../../../data/remote/model/chat/message';
import {AppHelper} from '../../../../../utils/app-helper';
import {ConversationUtilService} from '../../../../../services/conversation-util/conversation-util.service';

@Component({
  selector: 'app-system-message-content-item',
  templateUrl: './system-message-content-item.component.html',
  styleUrls: ['./system-message-content-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemMessageContentItemComponent extends BaseComponent<Message> {

  public content: string;

  constructor(private _appHelper: AppHelper,
              private _conversationUtilService: ConversationUtilService,
              private _changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  protected async initializeComponent(data: Message): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return this._appHelper.tryLoad(async () => {
        this.content = this._conversationUtilService.getSystemMessageContent(data);
        this._changeDetectorRef.markForCheck();
      });
    }
    return result;
  }

}
