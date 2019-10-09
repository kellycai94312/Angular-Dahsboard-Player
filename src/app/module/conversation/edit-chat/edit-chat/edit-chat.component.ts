import { Component, forwardRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxImageComponent } from 'app/components/ngx-image/ngx-image/ngx-image.component';
import { NgxSelectionComponent } from 'app/components/ngx-selection/ngx-selection/ngx-selection.component';
import { BaseEditComponent } from 'app/data/local/component/base/base-edit-component';
import { ClientError } from 'app/data/local/error/client-error';
import { PropertyConstant } from 'app/data/local/property-constant';
import { Chat } from 'app/data/remote/model/chat';
import { FileClass } from 'app/data/remote/model/file/base';
import { ImageType } from 'app/data/remote/model/file/image';
import { Person } from 'app/data/remote/model/person';
import { IdRequest } from 'app/data/remote/request/id-request';
import { ConversationApiService } from 'app/data/remote/rest-api/api';
import { ParticipantRestApiService } from 'app/data/remote/rest-api/participant-rest-api.service';
import { ConversationQuery } from 'app/data/remote/rest-api/query/conversation-query';
import { NgxInput } from 'app/module/ngx/ngx-input/model/ngx-input';
import { TemplateModalService } from 'app/service/template-modal.service';
import { AppHelper } from 'app/utils/app-helper';
import { PersonItemComponent } from '../../../person/person-item/person-item/person-item.component';

@Component({
  selector: 'app-edit-chat',
  templateUrl: './edit-chat.component.html',
  styleUrls: ['./edit-chat.component.scss']
})
export class EditChatComponent extends BaseEditComponent<Chat> implements OnInit {

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly propertyConstantClass = PropertyConstant;

  @ViewChild(NgxImageComponent, {static: false})
  public _ngxImageComponent: NgxImageComponent;

  @ViewChild(NgxSelectionComponent, {static: true})
  public _ngxSelectionComponent: NgxSelectionComponent<PersonItemComponent, ConversationQuery, Person>;

  public nameNgxInput: NgxInput;

  constructor(private _router: Router,
              private _conversationApiService: ConversationApiService,
              // TODO: TemplateModalService can't inject without forwardRef()
              @Inject(forwardRef(() => TemplateModalService))
              private _templateModalService: TemplateModalService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  public async ngOnInit(): Promise<void> {
    await super.ngOnInit();

  }

  public async initialize(obj: Chat): Promise<boolean> {
    const result = await super.initialize(obj);
    if (result) {
      return this.appHelper.tryLoad(async () => {
        let selectedItems: Person[] = [];
        if (!this.appHelper.isNewObject(this.data)) {
          selectedItems = (await this._conversationApiService.getParticipants({
            conversationId: this.data.id,
            unassigned: false
          }).toPromise()).list.map(x => x.person);
        }

        this.nameNgxInput = new NgxInput();
        this.nameNgxInput.labelTranslation = 'name';
        this.nameNgxInput.required = true;
        this.nameNgxInput.control.setValidators(Validators.required);
        this.nameNgxInput.control.setValue(obj.name);

        this._ngxSelectionComponent.minCount = 1;
        await this._ngxSelectionComponent.initialize(PersonItemComponent,
          async (component, data) => {
            await component.initialize(data);
          },
          async (query: ConversationQuery) => {
            query.unassigned = true;
            const pageContainer = await this._conversationApiService.getParticipants(query).toPromise();
            return this.appHelper.pageContainerConverter(pageContainer, original => original.person);
          }, selectedItems);
      });
    }
    return result;
  }

  public async onRemove(): Promise<boolean> {
    if (!await this._templateModalService.showConfirmModal('areYouSure')) {
      return;
    }
    return this.appHelper.tryRemove(async () => {
      await this._conversationApiService.removeChat(this.data).toPromise();
    });
  }

  public async onSave(): Promise<boolean> {
    return this.appHelper.trySave(async () => {
      if (this._ngxSelectionComponent.selectedItems.length > 0) {
        this.data.name = this.nameNgxInput.control.value;

        if (this.appHelper.isNewObject(this.data)) {
          this.data = await this._conversationApiService.createChat({
            name: this.data.name,
            personIds: this._ngxSelectionComponent.selectedItems.map(person => new IdRequest(person.id))
          }).toPromise();
        } else {
          this.data = await this._conversationApiService.updateChat(this.data).toPromise();
          await this._conversationApiService.updateParticipants(this.data, this._ngxSelectionComponent.selectedItems).toPromise();
        }
        if (this._ngxImageComponent) {
          await this._ngxImageComponent.save(void 0, false);
        }
      } else {
        throw new ClientError('chatMustContainOneParticipant');
      }
    });
  }

}
