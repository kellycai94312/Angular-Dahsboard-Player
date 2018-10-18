import {Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupService} from '../../group.service';
import {GroupPerson} from '../../../../data/remote/model/group/group-person';
import {AppHelper} from '../../../../utils/app-helper';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {GroupPersonQuery} from '../../../../data/remote/rest-api/query/group-person-query';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EditGroupPersonLogComponent} from '../../component/edit-group-person-log/edit-group-person-log.component';
import {Group} from '../../../../data/remote/model/group/base/group';
import {SplitButtonItem} from '../../../../components/ngx-split-button/bean/split-button-item';
import {NgxModalRef} from '../../../../components/ngx-modal/bean/ngx-modal-ref';
import {NgxButtonType} from '../../../../components/ngx-button/model/ngx-button-type';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  public readonly ngxButtonTypeClass = NgxButtonType;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public groupPersonQuery: GroupPersonQuery;
  private _group: Group;

  constructor(private  _participantRestApiService: ParticipantRestApiService,
              private _groupService: GroupService,
              private _appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
    this.groupPersonQuery = new GroupQuery();
    this.groupPersonQuery.name = '';
    this.groupPersonQuery.from = 0;
    this.groupPersonQuery.count = PropertyConstant.pageSize;
    this.groupPersonQuery.id = this._groupService.getGroup().id;
    this.groupPersonQuery.approved = false;
  }

  async ngOnInit() {
    this._group = this._groupService.getGroup();
    await this.updateItems();
  }

  public onAdd = async (groupPerson: GroupPerson) => {
    await this.showModal(groupPerson, async (modal: NgxModalRef, component: EditGroupPersonLogComponent) => {
      return {
        nameKey: 'save',
        callback: async () => {
          await this._appHelper.trySave(async () => {
            await this._participantRestApiService.putApprovePersonInGroup(
              {
                id: this._groupService.getGroup().id,
                personId: groupPerson.person.id
              });
            this._appHelper.removeItem(this.ngxVirtualScrollComponent.items, groupPerson);
            await this._participantRestApiService.updateGroupPersonLog(component.data, {}, {groupId: this._group.id, personId: groupPerson.person.id, groupPersonLogId: component.data.id});
            modal.dismiss();
          });
        }
      };
    });
  };

  public onRemove = async (groupPerson: GroupPerson) => {
    await this.showModal(groupPerson, async (modal: NgxModalRef, component: EditGroupPersonLogComponent) => {
      return {
        nameKey: 'remove',
        callback: async () => {
          await this._appHelper.tryRemove(async () => {
            await this._participantRestApiService.updateGroupPersonLog(component.data, {}, {groupId: this._group.id, personId: groupPerson.person.id, groupPersonLogId: component.data.id});
            await this._participantRestApiService.deleteApprovePersonInGroup({
              id: this._groupService.getGroup().id,
              personId: groupPerson.person.id
            });
            this._appHelper.removeItem(this.ngxVirtualScrollComponent.items, groupPerson);
            modal.dismiss();
          });
        }
      };
    });
  };

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
    return await this._participantRestApiService.getGroupPersonsByGroup(pageQuery);
  };

  private async showModal(groupPerson: GroupPerson, initializeSplitButtonItem: (modal: NgxModalRef, component: EditGroupPersonLogComponent) => Promise<SplitButtonItem>) {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    await modal.componentInstance.initializeBody(EditGroupPersonLogComponent, async component => {
      component.manualInitialization = true;
      const groupPersonLog = await this._participantRestApiService.getLatestGroupPersonLog({groupId: this._group.id, personId: groupPerson.person.id});
      await component.initialize(groupPersonLog);
      modal.componentInstance.splitButtonItems = [await initializeSplitButtonItem(modal, component)];
    });
  }

  private async updateItems() {
    setTimeout(async () => {
      await this.ngxVirtualScrollComponent.reset();
    });
  }

}
