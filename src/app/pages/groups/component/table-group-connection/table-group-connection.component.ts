import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {GroupConnectionType} from '../../../../data/remote/model/group/group-connection-type';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {GroupConnectionViewModel} from '../../../../data/local/view-model/group/group-connection-view-model';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EditGroupConnectionComponent} from '../edit-group-connection/edit-group-connection.component';
import {GroupConnection} from '../../../../data/remote/model/group/group-connection';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {Document} from '../../../../data/remote/model/file/document/document';

@Component({
  selector: 'app-table-group-connection',
  templateUrl: './table-group-connection.component.html',
  styleUrls: ['./table-group-connection.component.scss']
})
export class TableGroupConnectionComponent implements OnInit {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public groupId: number;

  @Input()
  public type: GroupConnectionType;

  public typeNameKey: string;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _ngxModalService: NgxModalService) {
  }

  async ngOnInit() {
    await this._appHelper.tryLoad(async () => {
      this.typeNameKey = this.getTranslateNameKey();
      await this.resetItems();
    });
  }

  public onEdit = async (e: any, parameter: GroupConnectionViewModel) => {
    await this.showModal(parameter);
  };

  public onAdd = async () => {
    const groupConnection = new GroupConnection();
    groupConnection.type = this.type;
    await this.showModal(new GroupConnectionViewModel(groupConnection));
  };

  public getItems: Function = async (direction: Direction, query: GroupQuery) => {
    query.groupConnectionType = this.type;
    const pageContainer = await this._participantRestApiService.getGroupConnections({}, query, {groupId: this.groupId});
    return this._appHelper.pageContainerConverter(pageContainer, async original => {
      const groupConnectionViewModel = new GroupConnectionViewModel(original);
      await groupConnectionViewModel.initialize();
      return groupConnectionViewModel;
    });
  };

  public getDocumentUrl(item: Document) {
    return this._participantRestApiService.getDocument(item.id);
  }

  private async resetItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

  private getTranslateNameKey(): string {
    switch (this.type) {
      case GroupConnectionType.TOP:
        return 'topLevel';
      case GroupConnectionType.SAME:
        return 'sameLevel';
      case GroupConnectionType.BOTTOM:
        return 'bottomLevel';
    }
    return null;
  }

  private async showModal(groupConnectionViewModel: GroupConnectionViewModel) {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    await modal.componentInstance.initializeBody(EditGroupConnectionComponent, async component => {
      component.manualInitialization = true;
      await component.initialize(this._appHelper.cloneObject(groupConnectionViewModel.data));

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'save',
          default: true,
          callback: async () => {
            if (await this._ngxModalService.save(modal, component, !this._appHelper.isNewObject(component.data))) {
              await this.resetItems();
            }
          },
        },
        {
          nameKey: 'remove',
          callback: async () => {
            if (await this._ngxModalService.remove(modal, component)) {
              await this.resetItems();
            }
          },
        }
      ];
    });

    modal.result.then(async x => {
      await this.resetItems();
    }, async reason => {
    });
  }

}
