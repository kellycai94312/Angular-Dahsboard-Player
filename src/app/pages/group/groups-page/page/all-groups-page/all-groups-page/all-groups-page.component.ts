import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ItemDisplay} from '../../../../../../module/common/item-list/model/item-display';
import {takeWhile} from 'rxjs/operators';
import {GroupsListComponent} from '../../../../../../module/group/groups-list/groups-list/groups-list.component';
import {GroupQuery} from '../../../../../../data/remote/rest-api/query/group-query';
import {GroupsService} from '../../../service/groups/groups.service';

@Component({
  selector: 'app-all-groups-page',
  templateUrl: './all-groups-page.component.html',
  styleUrls: ['./all-groups-page.component.scss']
})
export class AllGroupsPageComponent implements OnInit, OnDestroy {

  @ViewChild(GroupsListComponent)
  public _groupsListComponent: GroupsListComponent;

  public readonly groupQuery: GroupQuery;
  public itemDisplay: ItemDisplay;
  private _notDestroyed = true;

  constructor(private _groupsService: GroupsService) {
    this.groupQuery = {
      name: ''
    };
  }

  public ngOnInit(): void {
    this._groupsService.changedSearchText$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async (value) => {
          this.groupQuery.name = value;
          await this._groupsListComponent.updateItems();
        }
      );
    this._groupsService.changedItemDisplay$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async (value) => {
          this.itemDisplay = value;
          await this._groupsListComponent.updateItems();
        }
      );
  }

  public ngOnDestroy(): void {
    this._notDestroyed = false;
  }

}
