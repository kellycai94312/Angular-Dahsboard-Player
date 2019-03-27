import {Injectable} from '@angular/core';
import {Chat} from '../../../../data/remote/model/chat/conversation/chat';
import {DialogResult} from '../../../../data/local/dialog-result';
import {EditChatComponent} from '../../../../module/conversation/edit-chat/edit-chat/edit-chat.component';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {AppHelper} from '../../../../utils/app-helper';
import {ModalBuilderService} from '../../../../service/modal-builder/modal-builder.service';
import {ChatService} from '../../chat/chat.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationModalService {

  constructor(private _ngxModalService: NgxModalService,
              private _modalBuilderService: ModalBuilderService,
              private _appHelper: AppHelper,
              private _chatService: ChatService,
              private _translateObjectService: TranslateObjectService) {
  }

  public async showEditChat(chat: Chat): Promise<DialogResult<Chat>> {
    const modal = this._ngxModalService.open();
    let defaultName = chat.name;
    if (!defaultName) {
      defaultName = `${await this._translateObjectService.getTranslation('new')} ${await this._translateObjectService.getTranslation('chat')}`;
    }
    await this._modalBuilderService.updateModalTitle(modal, chat, defaultName);
    let editChatComponent: EditChatComponent = null;
    await modal.componentInstance.initializeBody(EditChatComponent, async component => {
      editChatComponent = component;
      await component.initialize(this._appHelper.cloneObject(chat));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          if (await this._ngxModalService.save(modal, component)) {
            this._chatService.onChatSelected.next(component.data);
          }
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
            if (await this._ngxModalService.remove(modal, component)) {
              this._chatService.onChatSelected.next(undefined);
            }
          },
          () => {
            return !this._appHelper.isNewObject(component.data);
          }
        )
      ];
    });
    const dialogResult: DialogResult<Chat> = {result: await this._ngxModalService.awaitModalResult(modal)};
    if (dialogResult.result) {
      dialogResult.data = editChatComponent.data;
    }
    return dialogResult;
  }

}
