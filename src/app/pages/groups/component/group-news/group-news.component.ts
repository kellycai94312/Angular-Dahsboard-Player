import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseGroupComponent} from '../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../data/remote/model/group/base/group';
import {GroupService} from '../../group.service';
import {AppHelper} from '../../../../utils/app-helper';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {IconEnum} from '../../../../components/ngx-button/model/icon-enum';
import {GroupNews} from '../../../../data/remote/model/group/group-news';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {EditGroupNewsComponent} from '../edit-group-news/edit-group-news.component';

@Component({
  selector: 'app-group-news',
  templateUrl: './group-news.component.html',
  styleUrls: ['./group-news.component.scss']
})
export class GroupNewsComponent extends BaseGroupComponent<Group> implements OnInit {

  public readonly iconEnumClass = IconEnum;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public canEdit: boolean;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _ngxModalService: NgxModalService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  async ngOnInit() {
    await this.resetItems();
    this.canEdit = await this.groupService.canEditNews();
  }

  public fetchItems = async (direction: Direction, pageQuery: PageQuery) => {
    return await this._participantRestApiService.getGroupNewsItems({}, pageQuery, {groupId: this.group.id});
  };

  public onAdd = async () => {
    await this.showModal(new GroupNews());
  };

  public onEdit = async (obj: GroupNews) => {
    await this.showModal(obj);
  };

  private async showModal(obj: GroupNews) {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(EditGroupNewsComponent, async component => {
      await component.initialize(this.appHelper.cloneObject(obj));
      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    });
    if (await this._ngxModalService.awaitModalResult(modal)) {
      await this.resetItems();
    }
  }

  private async resetItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}
