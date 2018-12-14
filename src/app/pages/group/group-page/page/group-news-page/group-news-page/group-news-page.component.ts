import {Component, ViewChild} from '@angular/core';
import {BaseGroupComponent} from '../../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../service/group.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {Direction} from '../../../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {IconEnum} from '../../../../../../components/ngx-button/model/icon-enum';
import {GroupNews} from '../../../../../../data/remote/model/group/news/group-news';
import {NgxModalService} from '../../../../../../components/ngx-modal/service/ngx-modal.service';
import {NgxVirtualScrollComponent} from '../../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {TemplateModalService} from '../../../../../../service/template-modal.service';
import {HtmlService} from '../../../../../../service/html/html.service';
import {GroupPerson} from '../../../../../../data/remote/model/group/group-person';

@Component({
  selector: 'app-group-news-page',
  templateUrl: './group-news-page.component.html',
  styleUrls: ['./group-news-page.component.scss']
})
export class GroupNewsPageComponent extends BaseGroupComponent<Group> {

  public readonly iconEnumClass = IconEnum;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _ngxModalService: NgxModalService,
              private _templateModalService: TemplateModalService,
              private _htmlService: HtmlService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  async initializeGroupPerson(groupPerson: GroupPerson): Promise<void> {
    await super.initializeGroupPerson(groupPerson);
    await this.resetItems();
  }

  public fetchItems = async (direction: Direction, pageQuery: PageQuery) => {
    return await this._participantRestApiService.getGroupNewsItems({}, pageQuery, {groupId: this.group.id});
  };

  public onAdd = async () => {
    await this.showModal(new GroupNews());
  };

  private async showModal(obj: GroupNews) {
    const dialogResult = await this._templateModalService.showEditGroupNewsModal(obj, this.group);
    if (dialogResult.result) {
      await this.resetItems();
    }
  }

  private async resetItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}
