import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TrainingBlockQuery} from '../../../../../../data/remote/rest-api/query/training-block-query';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {Person} from '../../../../../../data/remote/model/person';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {EventReportService} from '../../../service/event-report.service';
import {ListRequest} from '../../../../../../data/remote/request/list-request';
import {Direction} from '../../../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../../../data/remote/rest-api/page-query';
import {NgxVirtualScrollComponent} from '../../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {fromEvent, SubscriptionLike as ISubscription} from 'rxjs';
import {TrainingBlock} from '../../../../../../data/remote/model/training/report/training-block';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-persons-event-block',
  templateUrl: './persons-event-block.component.html',
  styleUrls: ['./persons-event-block.component.scss']
})
export class PersonsEventBlockComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput')
  public searchInputElementRef: ElementRef;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public query: TrainingBlockQuery;
  public persons: Person[];
  public _trainingBlock: TrainingBlock;

  private readonly _maxCountPersons: number;

  private _searchInputSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _eventReportService: EventReportService) {
    this.query = new TrainingBlockQuery();
    this.query.name = '';
    this.query.unassigned = true;

    this._maxCountPersons = 10;
  }

  async ngOnInit() {
    this._searchInputSubscription = fromEvent(this.searchInputElementRef.nativeElement, 'keyup')
      .pipe(debounceTime(PropertyConstant.searchDebounceTime))
      .subscribe(async (event: any) => {
        this.query.name = event.target.value;
        await this.resetItems();
      });

    this._trainingBlock = await this._eventReportService.getSelectedTrainingBlock();
    try {
      this.persons = (await this._participantRestApiService.getTrainingBlockPersons({}, {
        count: PropertyConstant.pageSizeMax,
        unassigned: false
      }, {
        trainingReportId: this._trainingBlock.trainingReport.id,
        trainingBlockId: this._trainingBlock.id
      })).list;
    } catch (e) {
      await this._appHelper.showErrorMessage('loadDataError');
    }

    await this.resetItems();
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._searchInputSubscription);
  }

  public onSelected(person: Person) {
    this._appHelper.removeItem(this.ngxVirtualScrollComponent.items, person);
    this.persons.push(person);
  }

  public onUnselected(person: Person) {
    this._appHelper.removeItem(this.persons, person);
    this.ngxVirtualScrollComponent.items.push(person);
  }

  public getItemsWithoutSelected: Function = async (direction: Direction, pageQuery: PageQuery) => {
    const personPageContainer = await this._participantRestApiService.getTrainingBlockPersons(
      {},
      pageQuery,
      {
        trainingReportId: this._trainingBlock.trainingReport.id,
        trainingBlockId: this._trainingBlock.id
      });

    personPageContainer.list = this._appHelper.except(personPageContainer.list, this.persons, (first, second) => {
      return first.id == second.id;
    });
    return personPageContainer;
  };

  public onSave = async () => {
    if (this.persons && this.persons.length > this._maxCountPersons) {
      await this._appHelper.showErrorMessage('maximumCount', {count: this._maxCountPersons});
      return;
    }

    try {
      this.persons = await this._participantRestApiService.updateTrainingBlockPersons(
        new ListRequest<Person>(this.persons),
        {},
        {
          trainingReportId: this._trainingBlock.trainingReport.id,
          trainingBlockId: this._trainingBlock.id
        }
      );
      await this._appHelper.showSuccessMessage('saved');
    } catch (e) {
      await this._appHelper.showErrorMessage('saveError');
    }
  };

  private async resetItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}
