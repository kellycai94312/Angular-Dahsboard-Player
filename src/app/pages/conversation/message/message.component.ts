import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Person} from '../../../data/remote/model/person';
import {Message} from '../../../data/remote/model/chat/message/message';
import {ConversationMessageViewModel} from '../../../data/local/view-model/conversation/conversation-message-view-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterContentInit {

  @Input()
  public message: Message;

  @Input()
  public onlyContent: boolean = false;

  public messageViewModel: ConversationMessageViewModel;

  public person: Person;

  constructor(private _authorizationService: AuthorizationService,
              private _router: Router) {
  }

  async ngOnInit() {
    this.person = await this._authorizationService.getPerson();
  }

  async ngAfterContentInit() {
    this.messageViewModel = new ConversationMessageViewModel(this.message);
    await this.messageViewModel.build();
  }

  public async onDataClick(event: any) {
    if (event.target.tagName.toLowerCase() === 'a') {
      const link = event.target.getAttribute('link');
      await this._router.navigate([link]);
    }
  }

}
