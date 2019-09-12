import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GroupsListComponent} from '../../../../module/group/groups-list/groups-list/groups-list.component';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {ItemDisplay} from '../../../../module/common/item-list/model/item-display';
import {skip, take, takeWhile} from 'rxjs/operators';
import {ListHeadingService} from '../../../../module/common/list-heading/services/list-heading.service';
import {zip} from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  @ViewChild(GroupsListComponent)
  public _groupsListComponent: GroupsListComponent;

  public readonly groupQuery: GroupQuery;
  public itemDisplay: ItemDisplay;
  private _notDestroyed = true;

  constructor(private _listHeadingService: ListHeadingService) {
    this.groupQuery = {
      name: '',
      all: false
    };
  }

  public ngOnInit(): void {
    this._listHeadingService.search$
      .pipe(
        takeWhile(() => this._notDestroyed),
        skip(1)
      )
      .subscribe(async value => {
        this.groupQuery.name = value;
        await this._groupsListComponent.updateItems();
      });
    this._listHeadingService.itemDisplay$
      .pipe(
        takeWhile(() => this._notDestroyed),
        skip(1)
      )
      .subscribe(async value => {
        this.itemDisplay = value;
        await this._groupsListComponent.updateItems();
      });

    zip(this._listHeadingService.search$, this._listHeadingService.itemDisplay$)
      .pipe(take(1))
      .subscribe(async value => {
        this.groupQuery.name = value[0];
        this.itemDisplay = value[1];
      });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

}
