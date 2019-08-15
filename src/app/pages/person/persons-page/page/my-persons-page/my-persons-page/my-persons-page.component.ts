import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PersonQuery} from '../../../../../../data/remote/rest-api/query/person-query';
import {PersonsListComponent} from '../../../../../../module/person/persons-list/persons-list/persons-list.component';
import {PersonsService} from '../../../service/persons/persons.service';
import {skip, take, takeWhile} from 'rxjs/operators';
import {ItemDisplay} from '../../../../../../module/common/item-list/model/item-display';
import {zip} from 'rxjs';

@Component({
  selector: 'app-my-persons-page',
  templateUrl: './my-persons-page.component.html',
  styleUrls: ['./my-persons-page.component.scss']
})
export class MyPersonsPageComponent implements OnInit, OnDestroy {

  @ViewChild(PersonsListComponent)
  public _personsListComponent: PersonsListComponent;

  public readonly personQuery: PersonQuery;
  public itemDisplay: ItemDisplay;
  public canShow: boolean;
  private _notDestroyed = true;

  constructor(private _personsService: PersonsService) {
    this.personQuery = {
      name: '',
      connected: true
    };
  }

  public ngOnInit(): void {
    this._personsService.changedSearchText$
      .pipe(
        takeWhile(() => this._notDestroyed),
        skip(1)
      )
      .subscribe(async (value) => {
          this.personQuery.name = value;
          await this._personsListComponent.updateItems();
        }
      );
    this._personsService.changedItemDisplay$
      .pipe(
        takeWhile(() => this._notDestroyed),
        skip(1)
      )
      .subscribe(async (value) => {
          this.itemDisplay = value;
          await this._personsListComponent.updateItems();
        }
      );

    zip(this._personsService.changedSearchText$, this._personsService.changedItemDisplay$)
      .pipe(
        takeWhile(() => this._notDestroyed),
        take(1)
      )
      .subscribe(values => {
        this.personQuery.name = values[0];
        this.itemDisplay = values[1];
        this.canShow = true;
      });
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

}
