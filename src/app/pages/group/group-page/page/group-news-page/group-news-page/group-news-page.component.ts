import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseGroupComponent} from '../../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../service/group.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {Direction} from '../../../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {IconEnum} from '../../../../../../components/ngx-button/model/icon-enum';
import {NgxVirtualScrollComponent} from '../../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {GroupPerson} from '../../../../../../data/remote/model/group/group-person';
import {skipWhile, takeWhile} from 'rxjs/operators';
import {GroupNews} from '../../../../../../data/remote/model/group/news/group-news';

@Component({
  selector: 'app-group-news-page',
  templateUrl: './group-news-page.component.html',
  styleUrls: ['./group-news-page.component.scss']
})
export class GroupNewsPageComponent extends BaseGroupComponent<Group> implements OnInit {

  public readonly iconEnumClass = IconEnum;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  ngOnInit(): void {
    this.groupService.updateData$
      .pipe(
        takeWhile(() => this.notDestroyed),
        skipWhile(value => !(value instanceof GroupNews))
      )
      .subscribe(value => {
        const itemIndex = this.ngxVirtualScrollComponent.items.findIndex((x: GroupNews) => x.id == value.id);
        if (itemIndex > -1) {
          this.ngxVirtualScrollComponent.items[itemIndex] = value;
        } else {
          this.ngxVirtualScrollComponent.items.unshift(value);
        }
      });
  }

  async initializeGroupPerson(groupPerson: GroupPerson): Promise<void> {
    await super.initializeGroupPerson(groupPerson);
    await this.resetItems();
  }

  public fetchItems = async (direction: Direction, pageQuery: PageQuery) => {
    return await this._participantRestApiService.getGroupNewsItems({}, pageQuery, {groupId: this.group.id});
  };

  private async resetItems() {
    await this.appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
