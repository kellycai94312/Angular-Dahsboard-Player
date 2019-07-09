import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GroupQuery} from '../../../../../../data/remote/rest-api/query/group-query';
import {GroupsListComponent} from '../../../../../../module/group/groups-list/groups-list/groups-list.component';
import {ItemDisplay} from '../../../../../../module/common/item-list/model/item-display';
import {GroupsService} from '../../../service/groups/groups.service';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-my-groups-page',
  templateUrl: './my-groups-page.component.html',
  styleUrls: ['./my-groups-page.component.scss']
})
export class MyGroupsPageComponent implements OnInit, OnDestroy {

  @ViewChild(GroupsListComponent)
  public _groupsListComponent: GroupsListComponent;

  public readonly groupQuery: GroupQuery;
  public itemDisplay: ItemDisplay;
  private _notDestroyed = true;

  constructor(private _groupsService: GroupsService) {
    this.groupQuery = {
      name: '',
      all: false
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
