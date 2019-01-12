import {Component, Input} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EditDocumentComponent} from '../../../groups/component/edit-document/edit-document.component';
import {Document} from '../../../../data/remote/model/file/document/document';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {PersonService} from '../../../person/person-page/service/person.service';
import {PublicUserRole} from '../../../../data/remote/model/group/public-user-role';

// @Component({
//   selector: 'app-edit-person-stage',
//   templateUrl: './edit-person-stage.component.html',
//   styleUrls: ['./edit-person-stage.component.scss']
// })
// TODO: Use PublicUserRole without any type
export class EditPersonStageComponent extends BaseEditComponent<any> {

  public readonly propertyConstant = PropertyConstant;

  @Input()
  public personId;

  @Input()
  public sportTypeId;

  private _document: Document;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _ngxModalService: NgxModalService,
              private _personService: PersonService) {
    super(participantRestApiService, appHelper);
    this._document = new Document();
    this._document.clazz = FileClass.PUBLIC_USER_ROLE;
  }

  public async initialize(obj: PublicUserRole): Promise<boolean> {
    await super.initialize(obj);
    this._document.objectId = this.data.id;

    return this.appHelper.tryLoad(async () => {
      if (this.data && this.data.id) {
        const documents = await this.participantRestApiService.getDocuments({clazz: FileClass.PUBLIC_USER_ROLE, objectId: this.data.id, count: 1});
        if (documents.list.length) {
          this._document = documents.list[0];
        }
      }
    });
  }

  public async onSave(): Promise<boolean> {
    return this.appHelper.trySave(async () => {
      this.data.joinDate = this.appHelper.getGmtDate(this.data.joinDate);
      this.data.leaveDate = this.appHelper.getGmtDate(this.data.leaveDate);
      this.data = await this.participantRestApiService.updatePublicUserRole(this.data, {}, {personId: this.personId, publicUserRoleId: this.data.id});
      this._document.objectId = this.data.id;
      await this._personService.refreshCurrentPersonStage();
    });
  }

  public async onRemove(): Promise<boolean> {
    return false;
  }

  public editDocument = async () => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    await modal.componentInstance.initializeBody(EditDocumentComponent, async component => {
      await component.initialize(this.appHelper.cloneObject(this._document));

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'save',
          default: true,
          callback: async () => {
            await this._ngxModalService.save(modal, component);
          },
        },
        {
          nameKey: 'remove',
          callback: async () => {
            await this._ngxModalService.remove(modal, component);
          },
        }
      ];

      modal.result.then(async x => {
      }, async reason => {
        this._document = component.data;
      });
    });
  };

}
