import {animate, state, style, transition, trigger} from '@angular/animations';
import {Component, Input, OnInit} from '@angular/core';
import {Toast, ToastPackage, ToastrService} from 'ngx-toastr';
import {Message} from '../../data/remote/model/chat/message/message';
import {MessageViewModel} from '../../data/local/view-model/conversation/message-view-model';
import {Router} from '@angular/router';

@Component({
  selector: '[app-message-toastr]',
  styleUrls: ['./message-toastr.component.scss'],
  templateUrl: './message-toastr.component.html',
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        display: 'none',
        opacity: 0
      })),
      transition('inactive => active', animate('300ms ease-out')),
      transition('active => removed', animate('300ms ease-out')),
    ]),
  ],
  preserveWhitespaces: false,
})
export class MessageToastrComponent extends Toast implements OnInit {

  @Input()
  public message: Message;

  public messageViewModel: MessageViewModel;

  constructor(protected toastrService: ToastrService,
              public toastPackage: ToastPackage,
              private _router: Router) {
    super(toastrService, toastPackage);
  }

  async ngOnInit() {
    await this.buildMessageViewModal();
  }

  public async buildMessageViewModal(message: Message = this.message) {
    this.messageViewModel = new MessageViewModel(message);
    await this.messageViewModel.build();
  }

  public async onDataClick(event: any) {
    if (event.target.tagName.toLowerCase() === 'a') {
      const link = event.target.getAttribute('link');
      await this._router.navigate([link]);
    } else {
      //reload children when on the same state /conversation/:id
      if (this._router.url.indexOf('/conversation/') == 0) {
        await this._router.navigate(['/conversation']);
      }
      const conversationId = this.message.content.baseConversation.id;
      await this._router.navigate(['/conversation', conversationId]);
    }
  }

}
