import {Component, forwardRef, Inject, OnInit, ViewChild} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {Chat} from '../../../../data/remote/model/chat/conversation/chat';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ImageFormat} from '../../../../data/local/image-format';
import {NgxSelectionComponent} from '../../../../components/ngx-selection/ngx-selection/ngx-selection.component';
import {PersonItemComponent} from '../../../person/person-item/person-item/person-item.component';
import {ConversationQuery} from '../../../../data/remote/rest-api/query/conversation-query';
import {Person} from '../../../../data/remote/model/person';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {IdRequest} from '../../../../data/remote/request/id-request';
import {ClientError} from '../../../../data/local/error/client-error';
import {Router} from '@angular/router';
import {NgxImageComponent} from '../../../../components/ngx-image/ngx-image/ngx-image.component';
import {TemplateModalService} from '../../../../service/template-modal.service';

@Component({
  selector: 'app-edit-chat',
  templateUrl: './edit-chat.component.html',
  styleUrls: ['./edit-chat.component.scss']
})
export class EditChatComponent extends BaseEditComponent<Chat> implements OnInit {

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly propertyConstantClass = PropertyConstant;
  public readonly imageFormatClass = ImageFormat;

  @ViewChild(NgxImageComponent)
  public _ngxImageComponent: NgxImageComponent;

  @ViewChild(NgxSelectionComponent)
  public _ngxSelectionComponent: NgxSelectionComponent<PersonItemComponent, ConversationQuery, Person>;

  constructor(private _router: Router,
              // TODO: TemplateModalService can't inject without forwardRef()
              @Inject(forwardRef(() => TemplateModalService))
              private _templateModalService: TemplateModalService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  async initialize(obj: Chat): Promise<boolean> {
    const result = await super.initialize(obj);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        let selectedItems: Person[] = [];
        if (!this.appHelper.isNewObject(this.data)) {
          selectedItems = (await this.participantRestApiService.getParticipants({conversationId: this.data.id, unassigned: false})).list.map(x => x.person);
        }
        await this._ngxSelectionComponent.initialize(PersonItemComponent,
          async (component, data) => {
            await component.initialize(data);
          },
          async (query: ConversationQuery) => {
            query.unassigned = true;
            const pageContainer = await this.participantRestApiService.getParticipants(query);
            return this.appHelper.pageContainerConverter(pageContainer, original => {
              return original.person;
            });
          }, selectedItems);
      });
    }
    return result;
  }

  async onRemove(): Promise<boolean> {
    if (!await this._templateModalService.showConfirmModal('areYouSure')) {
      return;
    }
    return await this.appHelper.tryRemove(async () => {
      await this.participantRestApiService.deleteChat({conversationId: this.data.id});
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      if (this._ngxSelectionComponent.selectedItems.length > 0) {
        if (this.appHelper.isNewObject(this.data)) {
          const chat = await this.participantRestApiService.createChat({
            name: this.data.name,
            personIds: this._ngxSelectionComponent.selectedItems.map(person => new IdRequest(person.id))
          });
          this.appHelper.updateObject(this.data, chat);
        } else {
          const chat = await this.participantRestApiService.updateChat(this.data, {}, {conversationId: this.data.id});
          this.appHelper.updateObject(this.data, chat);
          await this.participantRestApiService.updateParticipants({list: this._ngxSelectionComponent.selectedItems.map(person => new IdRequest(person.id))}, {}, {conversationId: this.data.id});
        }
        await this._ngxImageComponent.save(null, false);
      } else {
        throw new ClientError('chatMustContainOneParticipant');
      }
    });
  }

  public async navigateToBase(): Promise<void> {
    await this._router.navigate(['/conversation']);
  }

  public async navigateToChat(): Promise<boolean> {
    if (this.data && this.data.id) {
      await this._router.navigate(['/conversation', this.data.id]);
      return true;
    }
    return false;
  }

}
