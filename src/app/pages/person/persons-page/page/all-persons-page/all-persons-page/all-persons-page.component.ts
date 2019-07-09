import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PersonQuery} from '../../../../../../data/remote/rest-api/query/person-query';
import {PersonsService} from '../../../service/persons/persons.service';
import {takeWhile} from 'rxjs/operators';
import {PersonsListComponent} from '../../../../../../module/person/persons-list/persons-list/persons-list.component';
import {ItemDisplay} from '../../../../../../module/common/item-list/model/item-display';

@Component({
  selector: 'app-all-persons-page',
  templateUrl: './all-persons-page.component.html',
  styleUrls: ['./all-persons-page.component.scss']
})
export class AllPersonsPageComponent implements OnInit, OnDestroy {

  @ViewChild(PersonsListComponent)
  public _personsListComponent: PersonsListComponent;

  public readonly personQuery: PersonQuery;
  public itemDisplay: ItemDisplay;
  private _notDestroyed = true;

  constructor(private _personsService: PersonsService) {
    this.personQuery = {
      name: ''
    };
  }

  public ngOnInit(): void {
    this._personsService.changedSearchText$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async (value) => {
          this.personQuery.name = value;
          await this._personsListComponent.updateItems();
        }
      );
    this._personsService.changedItemDisplay$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async (value) => {
          this.itemDisplay = value;
          await this._personsListComponent.updateItems();
        }
      );
  }

  public ngOnDestroy(): void {
    this._notDestroyed = false;
  }

}
