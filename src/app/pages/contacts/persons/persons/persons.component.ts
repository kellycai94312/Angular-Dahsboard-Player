import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PersonsListComponent} from '../../../../module/person/persons-list/persons-list/persons-list.component';
import {PersonQuery} from '../../../../data/remote/rest-api/query/person-query';
import {ItemDisplay} from '../../../../module/common/item-list/model/item-display';
import {ListHeadingService} from '../../../../module/common/list-heading/services/list-heading.service';
import {skip, take, takeWhile} from 'rxjs/operators';
import {zip} from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit, OnDestroy {

  @ViewChild(PersonsListComponent, { static: false })
  public _personsListComponent: PersonsListComponent;

  public readonly personQuery: PersonQuery;
  public itemDisplay: ItemDisplay;
  private _notDestroyed = true;

  constructor(private _listHeadingService: ListHeadingService) {
    this.personQuery = {
      name: '',
      connected: true
    };
  }

  public ngOnInit(): void {
    this._listHeadingService.search$
      .pipe(
        takeWhile(() => this._notDestroyed),
        skip(1)
      )
      .subscribe(async value => {
        this.personQuery.name = value;
        await this._personsListComponent.updateItems();
      });
    this._listHeadingService.itemDisplay$
      .pipe(
        takeWhile(() => this._notDestroyed),
        skip(1)
      )
      .subscribe(async value => {
        this.itemDisplay = value;
        await this._personsListComponent.updateItems();
      });

    zip(this._listHeadingService.search$, this._listHeadingService.itemDisplay$)
      .pipe(take(1))
      .subscribe(async value => {
        this.personQuery.name = value[0];
        this.itemDisplay = value[1];
      });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

}
