import {Component, ViewChild} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ViewType} from '../../../../data/local/view-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {GroupPersonLog} from '../../../../data/remote/model/group/group-person-log';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EditGroupPersonLogComponent} from '../edit-group-person-log/edit-group-person-log.component';

// @Component({
//   selector: 'app-edit-group-person-logs',
//   templateUrl: './edit-group-person-logs.component.html',
//   styleUrls: ['./edit-group-person-logs.component.scss']
// })
export class EditGroupPersonLogsComponent extends BaseEditComponent<GroupPerson> {

  public readonly propertyConstant = PropertyConstant;
  public readonly viewType = ViewType;
  public readonly fileClass = FileClass;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public pageQuery: PageQuery;
  public canEdit: boolean;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper);
    // TODO: Use validations
    this.canEdit = true;
  }

  async initialize(obj: GroupPerson): Promise<boolean> {
    return await this.appHelper.tryLoad(async () => {
      await super.initialize(obj);
      await this.updateItems();
    });
  }

  public fetchItems: Function = async (pageQuery: PageQuery) => {
    return await this.participantRestApiService.getGroupPersonLogs({}, pageQuery, {groupId: this.data.group.id, personId: this.data.person.id});
  };

  public onAdd = async () => {
    await this.showModal(new GroupPersonLog());
  };

  public onEdit = async (obj: GroupPersonLog) => {
    await this.showModal(obj);
  };

  async onRemove(): Promise<boolean> {
    return false;
  }

  async onSave(): Promise<boolean> {
    return false;
  }

  private async updateItems() {
    // TODO: Without setTimeout or promise delay not working in other components
    await this.appHelper.delay();
    await this.ngxGridComponent.reset();
  }

  private async showModal(obj: GroupPersonLog) {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(EditGroupPersonLogComponent, async component => {
      component.manualInitialization = true;
      component.groupId = this.data.group.id;
      component.personId = this.data.person.id;

      modal.componentInstance.splitButtonItems = [{
        nameKey: 'save',
        default: true,
        callback: async () => {
          await this._ngxModalService.save(modal, component, !this.appHelper.isNewObject(component.data));
        }
      }];

      await component.initialize(this.appHelper.cloneObject(obj));
    });

    modal.result.then(async x => {
      await this.updateItems();
    }, async reason => {
      await this.updateItems();
    });
  }

}
