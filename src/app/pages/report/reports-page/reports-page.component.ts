import {fromEvent as observableFromEvent, SubscriptionLike as ISubscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators/debounceTime';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxModalComponent} from '../../../components/ngx-modal/ngx-modal/ngx-modal.component';
import {NamedObjectComponent} from '../../../components/named-object/named-object/named-object.component';
import {Router} from '@angular/router';
import {TrainingReport} from '../../../data/remote/model/training/report/training-report';
import {PropertyConstant} from '../../../data/local/property-constant';
import {Direction} from '../../../components/ngx-virtual-scroll/model/direction';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput')
  public searchInputElementRef: ElementRef;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public query: PageQuery;

  private _searchInputSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _modalService: NgbModal,
              private _appHelper: AppHelper,
              private _router: Router) {
    this.query = new PageQuery();
  }

  async ngOnInit() {
    this._searchInputSubscription = observableFromEvent(this.searchInputElementRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(PropertyConstant.searchDebounceTime)
      )
      .subscribe(async (event: any) => {
        this.query.name = event.target.value;
        await this.resetItems();
      });
    await this.resetItems();
  }

  ngOnDestroy(): void {
    this._appHelper.unsubscribe(this._searchInputSubscription);
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    return await this._participantRestApiService.getTrainingReports(query);
  };

  public onCreate = async () => {
    const modal = this._modalService.open(NgxModalComponent, {size: 'lg'});
    const componentInstance = modal.componentInstance as NgxModalComponent;
    componentInstance.titleKey = 'createReport';
    await componentInstance.initializeBody(NamedObjectComponent, async component => {
      componentInstance.splitButtonItems = [
        {
          nameKey: 'save',
          callback: async () => {
            if (component.valid()) {
              try {
                let trainingReport = new TrainingReport();
                trainingReport.name = component.data.name;
                trainingReport.description = component.data.description;

                trainingReport = await this._participantRestApiService.createTrainingReport(trainingReport);
                modal.dismiss();
                await this.onShow(trainingReport);
              } catch (e) {
                await this._appHelper.showErrorMessage('saveError');
              }
            }
          }
        }];
    });
  };

  public async onShow(trainingReport: TrainingReport): Promise<void> {
    await this._router.navigate(['/report', trainingReport.id]);
  }

  private async resetItems(): Promise<void> {
    setTimeout(async () => {
      await this.ngxVirtualScrollComponent.reset();
    });
  }

}
