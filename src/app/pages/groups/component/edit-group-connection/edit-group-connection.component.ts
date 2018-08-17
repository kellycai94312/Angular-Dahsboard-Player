import {Component, ViewChild} from '@angular/core';
import {AppHelper} from '../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {GroupConnection} from '../../../../data/remote/model/group/group-connection';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {Group} from '../../../../data/remote/model/group/base/group';
import {GroupService} from '../../group.service';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {Document} from '../../../../data/remote/model/file/document/document';
import {EditDocumentComponent} from '../edit-document/edit-document.component';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {DocumentQuery} from '../../../../data/remote/rest-api/query/file/document-query';

@Component({
  selector: 'app-edit-group-connection',
  templateUrl: './edit-group-connection.component.html',
  styleUrls: ['./edit-group-connection.component.scss']
})
export class EditGroupConnectionComponent extends BaseEditComponent<GroupConnection> {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public readonly propertyConstant = PropertyConstant;

  public isSource: boolean;
  public query: DocumentQuery;

  public readonly _currentGroup: Group;

  constructor(participantRestApiService: ParticipantRestApiService, appHelper: AppHelper,
              private _groupService: GroupService,
              private _ngxModalService: NgxModalService) {
    super(participantRestApiService, appHelper);

    this._currentGroup = _groupService.getGroup();
    this.isSource = true;
    this.query = new DocumentQuery();
    this.query.clazz = FileClass.GROUP_CONNECTION;
  }

  async initialize(obj: GroupConnection): Promise<boolean> {
    await super.initialize(obj);
    this.query.objectId = this.data.id;

    if (obj.source && obj.target) {
      if (obj.source.id != this._currentGroup.id) {
        this.isSource = false;
      }
    }

    return await this.appHelper.tryLoad(async () => {
      await this.resetItems();
    });
  }

  getKey(group: Group) {
    return group.id;
  }

  getName(group: Group) {
    return group.name;
  }

  loadGroups = async (from: number, searchText: string) => {
    const pageContainer = await this.participantRestApiService.getGroupConnections({}, {
      from: from,
      count: PropertyConstant.pageSize,
      name: searchText,
      unassigned: true
    }, {groupId: this._currentGroup.id});
    return this.appHelper.pageContainerConverter(pageContainer, async obj => {
      return obj.target;
    });
  };

  public onAdd = async () => {
    const document = new Document();
    document.objectId = this.data.id;
    document.clazz = <any>FileClass[FileClass.GROUP_CONNECTION];
    await this.showModal(document);
  };

  public onEdit = async (e: any, parameter: Document) => {
    await this.showModal(parameter);
  };

  public async onSave(): Promise<boolean> {
    return this.appHelper.trySave(async () => {
      if (this.appHelper.isNewObject(this.data)) {
        this.data.source = this._currentGroup;
        this.data = await this.participantRestApiService.createGroupConnection(this.data, {}, {groupId: this._currentGroup.id});
      }

      if (this.isSource ? this.data.visibleBySource : this.data.visibleByTarget) {
        await this.participantRestApiService.visibleGroupConnection({}, {}, {groupId: this._currentGroup.id, groupConnectionId: this.data.id});
      } else {
        await this.participantRestApiService.invisibleGroupConnection({}, {}, {groupId: this._currentGroup.id, groupConnectionId: this.data.id});
      }
      this.query.objectId = this.data.id;
    });
  }

  public async onRemove(): Promise<boolean> {
    return this.appHelper.tryRemove(async () => {
      this.data = await this.participantRestApiService.removeGroupConnection({groupId: this._currentGroup.id, groupConnectionId: this.data.id});
    });
  }

  public getItems: Function = async (direction: Direction, query: DocumentQuery) => {
    if (!query.objectId) {
      return null;
    }
    return await this.participantRestApiService.getDocuments(query);
  };

  public getDocumentUrl(item: Document) {
    return this.participantRestApiService.getDocument(item.id);
  }

  private async showModal(document: Document) {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';

    await modal.componentInstance.initializeBody(EditDocumentComponent, async component => {
      component.manualInitialization = true;
      await component.initialize(this.appHelper.cloneObject(document));

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'save',
          default: true,
          callback: async () => {
            if (await this._ngxModalService.save(modal, component)) {
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
  }

  private async resetItems() {
    await this.appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
