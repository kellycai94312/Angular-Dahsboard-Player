import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ItemDisplay} from '../../../../../../module/common/item-list/model/item-display';
import {skip, take, takeWhile} from 'rxjs/operators';
import {GroupsListComponent} from '../../../../../../module/group/groups-list/groups-list/groups-list.component';
import {GroupQuery} from '../../../../../../data/remote/rest-api/query/group-query';
import {GroupsService} from '../../../service/groups/groups.service';
import {zip} from 'rxjs';

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
  public canShow: boolean;
  private _notDestroyed = true;

  constructor(private _groupsService: GroupsService) {
    this.groupQuery = {
      name: ''
    };
  }

  public ngOnInit(): void {
    this._groupsService.changedSearchText$
      .pipe(
        takeWhile(() => this._notDestroyed),
        skip(1)
      )
      .subscribe(async (value) => {
          this.groupQuery.name = value;
          await this._groupsListComponent.updateItems();
        }
      );
    this._groupsService.changedItemDisplay$
      .pipe(
        takeWhile(() => this._notDestroyed),
        skip(1)
      )
      .subscribe(async (value) => {
          this.itemDisplay = value;
          await this._groupsListComponent.updateItems();
        }
      );

    zip(this._groupsService.changedSearchText$, this._groupsService.changedItemDisplay$)
      .pipe(
        takeWhile(() => this._notDestroyed),
        take(1)
      )
      .subscribe(values => {
        this.groupQuery.name = values[0];
        this.itemDisplay = values[1];
        this.canShow = true;
      });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

}
