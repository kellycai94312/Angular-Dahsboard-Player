import {Component, ViewChild} from '@angular/core';
import {GroupPersonLog} from '../../../../data/remote/model/group/group-person-log';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxGridComponent} from '../../../../components/ngx-grid/ngx-grid/ngx-grid.component';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {PropertyConstant} from '../../../../data/local/property-constant';

@Component({
  selector: 'app-edit-group-person-log',
  templateUrl: './edit-group-person-log.component.html',
  styleUrls: ['./edit-group-person-log.component.scss']
})
export class EditGroupPersonLogComponent extends BaseEditComponent<GroupPerson> {

  public readonly propertyConstant = PropertyConstant;

  @ViewChild(NgxGridComponent)
  public ngxGridComponent: NgxGridComponent;

  public pageQuery: PageQuery;
  public currentGroupPersonLog: GroupPersonLog;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    this.currentGroupPersonLog = new GroupPersonLog();
  }

  async initialize(obj: GroupPerson): Promise<boolean> {
    return await this.appHelper.tryLoad(async () => {
      await super.initialize(obj);
      await this.updateItems();
    });
  }

  public fetchItems: Function = async (pageQuery: PageQuery) => {
    const pageContainer = await this.participantRestApiService.getGroupPersonLogs({}, pageQuery, {groupId: this.data.group.id, personId: this.data.person.id});
    if (this.appHelper.isNewObject(this.currentGroupPersonLog) && pageContainer.list.length) {
      this.currentGroupPersonLog = this.appHelper.cloneObject(pageContainer.list.find(x => this.appHelper.isUndefinedOrNull(x.leaveDate)) || new GroupPersonLog());
    }
    return pageContainer;
  };

  public disabledSaveButton = (): boolean => {
    return this.appHelper.isUndefinedOrNull(this.currentGroupPersonLog.joinDate);
  };

  public onAdd = async () => {
    await this.onSave();
  };

  async onRemove(): Promise<boolean> {
    return false;
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      let groupPersonLog: GroupPersonLog = this.appHelper.cloneObject(this.currentGroupPersonLog);
      groupPersonLog.joinDate = this.appHelper.getGmtDate(groupPersonLog.joinDate);
      groupPersonLog.leaveDate = this.appHelper.getGmtDate(groupPersonLog.leaveDate);

      if (this.appHelper.isNewObject(groupPersonLog)) {
        groupPersonLog = await this.participantRestApiService.createGroupPersonLog(groupPersonLog, {}, {
          groupId: this.data.group.id,
          personId: this.data.person.id
        });
      } else {
        groupPersonLog = await this.participantRestApiService.updateGroupPersonLog(groupPersonLog, {}, {
          groupId: this.data.group.id,
          personId: this.data.person.id,
          groupPersonLogId: groupPersonLog.id
        });
      }

      if (groupPersonLog.leaveDate && groupPersonLog.joinDate) {
        this.currentGroupPersonLog = new GroupPersonLog();
      } else {
        this.currentGroupPersonLog = groupPersonLog;
      }

      await this.updateItems();
    });
  }

  private async updateItems() {
    // TODO: Without setTimeout or promise delay not working in other components
    await this.appHelper.delay();
    await this.ngxGridComponent.reset();
  }

}
