import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '../../../../data/remote/model/location';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { TrainingQuery } from '../../../../data/remote/rest-api/query/training-query';
import { PersonService } from '../person.service';
import { AppHelper } from '../../../../utils/app-helper';
import { PageQuery } from '../../../../data/remote/rest-api/page-query';
import { DxTextBoxComponent } from 'devextreme-angular';
import { TrainingPerson } from '../../../../data/remote/model/training/training-person';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public pageSize: number;

  private readonly _trainingQuery: TrainingQuery;

  private trainingPersons: TrainingPerson[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _personService: PersonService) {
    this.pageSize = PropertyConstant.pageSize;
    this._trainingQuery = new TrainingQuery();
    this._trainingQuery.from = 0;
    this._trainingQuery.count = this.pageSize;
    this._trainingQuery.personId = _personService.shared.person.id;
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(value => {
        this._trainingQuery.name = value;
        this.updateListAsync();
      });
  }

  async onDateFromChange(event: any) {
    if (event.value) {
      this._trainingQuery.dateFrom = event.value.toISOString().split('T')[0];
    } else {
      delete this._trainingQuery.dateFrom;
    }
    await this.updateListAsync();
  }

  async onDateToChange(event: any) {
    if (event.value) {
      this._trainingQuery.dateTo = event.value.toISOString().split('T')[0];
    } else {
      delete this._trainingQuery.dateTo;
    }
    await this.updateListAsync();
  }

  async onLocationChange(e: any) {
    if (e.current) {
      this._trainingQuery.locationId = e.current.id;
    } else {
      delete this._trainingQuery.locationId;
    }
    await this.updateListAsync();
  }

  getKey(location: Location) {
    return location.id;
  }

  getName(location: Location) {
    return location.name;
  }

  loadLocations = async (from: number, searchText: string) => {
    return this._participantRestApiService.getLocations({
      from: from,
      count: this.pageSize,
      name: searchText
    });
  };

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  private async updateListAsync(from: number = 0) {
    this._trainingQuery.from = from;
    const container = await this._participantRestApiService.getPersonTrainings(this._trainingQuery);
    this.trainingPersons = AppHelper.pushItemsInList(from, this.trainingPersons, container);
  }

}
