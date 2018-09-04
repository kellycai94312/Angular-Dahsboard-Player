import {Component, Input, ViewChild} from '@angular/core';
import {GroupPersonLog} from '../../../../data/remote/model/group/group-person-log';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {AppHelper} from '../../../../utils/app-helper';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {ViewType} from '../../../../data/local/view-type';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {Document} from '../../../../data/remote/model/file/document/document';
import {EditDocumentComponent} from '../edit-document/edit-document.component';
import {FilesComponent} from '../../../../components/file/files/files.component';

@Component({
  selector: 'app-edit-group-person-log',
  templateUrl: './edit-group-person-log.component.html',
  styleUrls: ['./edit-group-person-log.component.scss']
})
export class EditGroupPersonLogComponent extends BaseEditComponent<GroupPersonLog> {

  public readonly propertyConstant = PropertyConstant;
  public readonly fileClass = FileClass;
  public readonly viewType = ViewType;

  @ViewChild(FilesComponent)
  public filesComponent: FilesComponent;

  @Input()
  public groupId: number;

  @Input()
  public personId: number;

  public pageQuery: PageQuery;
  public canEdit: boolean;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper);
    // TODO: Use validations
    this.canEdit = true;
  }

  async initialize(obj: GroupPersonLog): Promise<boolean> {
    await super.initialize(obj);
    return await this.appHelper.tryLoad(async () => {
      await this.resetItems();
    });
  }

  public onAdd = async () => {
    const document = new Document();
    document.objectId = this.data.id;
    document.clazz = <any>FileClass[FileClass.GROUP_PERSON_LOG];
    await this.showModal(document);
  };

  public onEdit = async (obj: Document) => {
    await this.showModal(obj);
  };

  async onRemove(): Promise<boolean> {
    return false;
  }

  async onSave(): Promise<boolean> {
    return this.appHelper.trySave(async () => {
      this.data.joinDate = this.appHelper.getGmtDate(this.data.joinDate);
      this.data.leaveDate = this.appHelper.getGmtDate(this.data.leaveDate);

      if (this.appHelper.isNewObject(this.data)) {
        this.data = await this.participantRestApiService.createGroupPersonLog(this.data, {}, {
          groupId: this.groupId,
          personId: this.personId
        });
      } else {
        this.data = await this.participantRestApiService.updateGroupPersonLog(this.data, {}, {
          groupId: this.groupId,
          personId: this.personId,
          groupPersonLogId: this.data.id
        });
      }
    });
  }

  private async resetItems() {
    // TODO: Without setTimeout or promise delay not working in other components
    await this.appHelper.delay();
    await this.filesComponent.reset();
  }

  private async showModal(obj: Document) {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    await  modal.componentInstance.initializeBody(EditDocumentComponent, async component => {
      await component.initialize(this.appHelper.cloneObject(obj));
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
    });

    // TODO: Use optimized algorithm for update objects
    modal.result.then(async x => {
      await this.resetItems();
    }, async reason => {
      await this.resetItems();
    });
  }

}
