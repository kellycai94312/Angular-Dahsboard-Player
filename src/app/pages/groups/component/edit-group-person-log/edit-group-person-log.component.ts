import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GroupPersonLog} from '../../../../data/remote/model/group/group-person-log';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {AppHelper} from '../../../../utils/app-helper';
import {PropertyConstant} from '../../../../data/local/property-constant';

@Component({
  selector: 'app-edit-group-person-log',
  templateUrl: './edit-group-person-log.component.html',
  styleUrls: ['./edit-group-person-log.component.scss']
})
export class EditGroupPersonLogComponent implements OnInit {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public manualInitialization: boolean;

  @Input()
  public groupPerson: GroupPerson;

  public readonly dateFormat: string;

  public pageQuery: PageQuery;
  public currentGroupPersonLog: GroupPersonLog;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    this.dateFormat = PropertyConstant.dateFormat;
    this.pageQuery = new PageQuery();
    this.currentGroupPersonLog = new GroupPersonLog();
  }

  async ngOnInit() {
    if (!this.manualInitialization) {
      await this.initialize(this.groupPerson);
    }
  }

  public async initialize(groupPerson: GroupPerson) {
    this.groupPerson = groupPerson;
    await this.updateItems();
  }

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getGroupPersonLog({}, pageQuery, {groupId: this.groupPerson.group.id, personId: this.groupPerson.person.id});
    if (this._appHelper.isNewObject(this.currentGroupPersonLog) && pageContainer.list.length) {
      this.currentGroupPersonLog = this._appHelper.cloneObject(pageContainer.list.find(x => this._appHelper.isUndefinedOrNull(x.leaveDate)) || new GroupPersonLog());
    }
    return pageContainer;
  };

  public disabledSaveButton = (): boolean => {
    return this._appHelper.isUndefinedOrNull(this.currentGroupPersonLog.joinDate);
  };

  public onSave = async () => {
    try {
      let groupPersonLog: GroupPersonLog = this._appHelper.cloneObject(this.currentGroupPersonLog);
      groupPersonLog.joinDate = this._appHelper.getGmtDate(groupPersonLog.joinDate);
      groupPersonLog.leaveDate = this._appHelper.getGmtDate(groupPersonLog.leaveDate);

      if (this._appHelper.isNewObject(groupPersonLog)) {
        groupPersonLog = await this._participantRestApiService.createGroupPersonLog(groupPersonLog, {}, {
          groupId: this.groupPerson.group.id,
          personId: this.groupPerson.person.id
        });
      } else {
        groupPersonLog = await this._participantRestApiService.updateGroupPersonLog(groupPersonLog, {}, {
          groupId: this.groupPerson.group.id,
          personId: this.groupPerson.person.id,
          groupPersonLogId: groupPersonLog.id
        });
      }

      if (groupPersonLog.leaveDate && groupPersonLog.joinDate) {
        this.currentGroupPersonLog = new GroupPersonLog();
      } else {
        this.currentGroupPersonLog = groupPersonLog;
      }

      await this.updateItems();
      await this._appHelper.showSuccessMessage('saved');
    } catch (e) {
      await this._appHelper.showErrorMessage('saveError');
    }
  };

  private async updateItems() {
    // TODO: Without setTimeout or promise delay not working in other components
    await this._appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
