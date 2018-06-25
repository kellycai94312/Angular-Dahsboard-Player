import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Message} from '../../../../data/remote/model/chat/message/message';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {BaseMessageContentType} from '../../../../data/remote/model/chat/message/base/base-message-content-type';

@Component({
  selector: 'app-chat-modal-delete-messages',
  templateUrl: './chat-modal-delete-message-confirm.component.html',
  styleUrls: ['./chat-modal-delete-message-confirm.component.scss']
})
export class ChatModalDeleteMessageConfirmComponent implements OnInit {

  @Input()
  messages: Message[];

  @Input()
  onDelete: (deleteForReceiver) => Promise<void>;

  public canDeleteForReceiver: boolean = false;
  public deleteForReceiver: boolean = false;

  constructor(public modal: NgbActiveModal,
              private _authorizationService: AuthorizationService) {
  }

  async ngOnInit() {
    const person = await this._authorizationService.getPerson();

    for (let message of this.messages) {
      if (message.sender.person.id != person.id || message.read || message.content.discriminator == BaseMessageContentType.SYSTEM_MESSAGE_CONTENT) {
        return;
      }
    }

    this.canDeleteForReceiver = true;
  }

  public async delete() {
    await this.onDelete(this.deleteForReceiver);
    this.modal.dismiss();
  }

}
