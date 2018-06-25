import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Chat} from '../../../../data/remote/model/chat/conversation/chat';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Image} from '../../../../data/remote/model/image';
import {ImageType} from '../../../../data/remote/model/image-type';
import {ImageClass} from '../../../../data/remote/misc/image-class';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {ImageComponent} from '../../../../components/image/image.component';

@Component({
  selector: 'app-chat-modal-edit',
  templateUrl: './chat-modal-settings.component.html',
  styleUrls: ['./chat-modal-settings.component.scss']
})
export class ChatModalSettingsComponent implements OnInit {

  @ViewChild('logo')
  public logo: ImageComponent;

  @Input()
  chat: Chat;

  @Input()
  chatChange: (chat: Chat) => Promise<void>;

  @Input()
  logoChange: () => Promise<void>;

  constructor(public modal: NgbActiveModal,
              private _participantRestApiService: ParticipantRestApiService) {
  }

  ngOnInit() {
  }

  public async onLogoChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const image: Image = new Image();
      image.clazz = ImageClass.CHAT;
      image.objectId = this.chat.id;
      image.type = ImageType.LOGO;
      await this._participantRestApiService.uploadImage(file, image);
      this.logo.refresh();
      await this.logoChange();
    }
  }

  public async onSave(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid) {
      this.chat = await this._participantRestApiService.updateChat(this.chat, {}, {conversationId: this.chat.id});
      await this.chatChange(this.chat);
      this.modal.dismiss();
    }
  }
}
