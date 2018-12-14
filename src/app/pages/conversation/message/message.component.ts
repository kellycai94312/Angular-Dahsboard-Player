import {Component, DoCheck, Input, KeyValueDiffers, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Person} from '../../../data/remote/model/person';
import {Message} from '../../../data/remote/model/chat/message/message';
import {MessageViewModel} from '../../../data/local/view-model/conversation/message-view-model';
import {Router} from '@angular/router';
import {BaseMessageContentType} from '../../../data/remote/model/chat/message/base/base-message-content-type';
import {MessageContent} from '../../../data/remote/model/chat/message/message-content';
import {PropertyConstant} from '../../../data/local/property-constant';
import {ConversationService} from '../../../shared/conversation.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, DoCheck {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly baseMessageContentTypeClass = BaseMessageContentType;

  @Input()
  public class: string;

  @Input()
  public message: Message;

  @Input()
  public onlyContent: boolean = false;

  public messageViewModel: MessageViewModel;
  public person: Person;
  public updated: Date;
  private differ: any;

  constructor(private _authorizationService: AuthorizationService,
              public conversationService: ConversationService,
              private _router: Router,
              differs: KeyValueDiffers) {
    this.class = '';
    this.differ = differs.find([]).create();
  }

  async ngOnInit() {
    this.person = await this._authorizationService.getPerson();

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
