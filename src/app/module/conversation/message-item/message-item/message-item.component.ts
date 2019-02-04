import {Component, DoCheck, Input, KeyValueDiffers, OnInit} from '@angular/core';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {BaseMessageContentType} from '../../../../data/remote/model/chat/message/base/base-message-content-type';
import {Message} from '../../../../data/remote/model/chat/message/message';
import {MessageViewModel} from '../../../../data/local/view-model/conversation/message-view-model';
import {Person} from '../../../../data/remote/model/person';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {ConversationService} from '../../../../shared/conversation.service';
import {Router} from '@angular/router';
import {MessageContent} from '../../../../data/remote/model/chat/message/message-content';
import {AppHelper} from '../../../../utils/app-helper';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit, DoCheck {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly baseMessageContentTypeClass = BaseMessageContentType;

  @Input()
  public class: string;

  @Input()
  public message: Message;

  @Input()
  public previewContent: boolean;

  public messageViewModel: MessageViewModel;
  public person: Person;
  public updated: Date;
  private differ: any;

  constructor(private _authorizationService: AuthorizationService,
              public conversationService: ConversationService,
              private _router: Router,
              private _appHelper: AppHelper,
              differs: KeyValueDiffers) {
    this.class = '';
    this.differ = differs.find([]).create();
  }

  async ngOnInit() {
    this.person = await this._appHelper.toPromise(this._authorizationService.personSubject);
    await this.buildMessage();
  }

  ngDoCheck(): void {
    const changes = this.differ.diff(this.message);
    if (changes) {
      changes.forEachChangedItem(async (elt) => {
        if (elt.key === 'content') {
          await this.buildMessage();
        }
      });
    }
  }

  public async onDataClick(event: any) {
    if (event.target.tagName.toLowerCase() === 'a') {
      const link = event.target.getAttribute('link');
      await this._router.navigate([link]);
    }
  }

  private async buildMessage() {
    this.messageViewModel = new MessageViewModel(this.message);
    await this.messageViewModel.build();

    if (this.message.content.discriminator == BaseMessageContentType.MESSAGE_CONTENT && (this.message.content as MessageContent).updated != undefined) {
      this.updated = (this.message.content as MessageContent).updated;
    }
  }

}
