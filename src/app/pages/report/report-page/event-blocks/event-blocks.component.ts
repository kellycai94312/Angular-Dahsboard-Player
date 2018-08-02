import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {Direction} from 'ngx-bootstrap/carousel/carousel.component';
import {AppHelper} from '../../../../utils/app-helper';
import {ActivatedRoute, Router} from '@angular/router';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SplitButtonItem} from '../../../../components/ngx-split-button/bean/split-button-item';
import {EventReportService} from '../service/event-report.service';
import {TranslateService} from '@ngx-translate/core';
import {TrainingBlock} from '../../../../data/remote/model/training/report/training-block';
import {TrainingBlockType} from '../../../../data/remote/model/training/report/training-block-type';
import {FileFormat, ReportsService} from '../../../../shared/reports.service';
import {TrainingReportBlockComponent} from '../../component/training-report-block/training-report-block.component';

@Component({
  selector: 'app-event-blocks',
  templateUrl: './event-blocks.component.html',
  styleUrls: ['./event-blocks.component.scss']
})
export class EventBlocksComponent implements OnInit {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @ViewChildren(TrainingReportBlockComponent)
  public trainingReportBlockComponents: QueryList<TrainingReportBlockComponent>;

  public readonly splitButtonItems: SplitButtonItem[];

  private _trainingReportId: number;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _modalService: NgbModal,
              private _appHelper: AppHelper,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _eventReportService: EventReportService,
              private _translateService: TranslateService,
              private _reportsService: ReportsService) {
    this.splitButtonItems = [
      {
        nameKey: 'add',
        default: true,
        callback: async () => {
          try {
            let trainingBlock = new TrainingBlock();
            trainingBlock.trainingBlockType = TrainingBlockType.TABLE;
            trainingBlock.name = await this._translateService.get('reportBlock').toPromise();
            trainingBlock = await this._participantRestApiService.createTrainingBlock(trainingBlock, {}, {trainingReportId: this._trainingReportId});
            await this.onShow(trainingBlock);
          } catch (e) {
            await this._appHelper.showErrorMessage('saveError');
          }
        }
      },
      {
        nameKey: 'exportToPdf',
        callback: async () => {
          await this._reportsService.downloadPersonMeasure(this._trainingReportId, this.getDisabledEventBlockSeries(), FileFormat.PDF);
        }
      },
      {
        nameKey: 'exportToExcel',
        callback: async () => {
          await this._reportsService.downloadPersonMeasure(this._trainingReportId, this.getDisabledEventBlockSeries(), FileFormat.EXCEL);
        }
      },
      {
        nameKey: 'print',
        callback: async () => {
          await this._reportsService.printPersonMeasure(this._trainingReportId, this.getDisabledEventBlockSeries());
        }
      }
    ];
  }

  async ngOnInit() {
    this._trainingReportId = (await this._eventReportService.getTrainingReport()).id;
    await this.resetItems();
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    return await this._participantRestApiService.getTrainingBlocks({}, query, {trainingReportId: this._trainingReportId});
  };

  public async onShow(baseTrainingBlock: TrainingBlock): Promise<void> {
    await this._router.navigate([baseTrainingBlock.id], {relativeTo: this._activatedRoute});
  }

  private async resetItems(): Promise<void> {
    setTimeout(async () => {
      await this.ngxVirtualScrollComponent.reset();
    });
  }

  private getDisabledEventBlockSeries(): EventBlockSeries[] {
    const disabledEventBlockSeries: EventBlockSeries[] = [];
    if (this.trainingReportBlockComponents) {
      for (const trainingReportBlockComponent of this.trainingReportBlockComponents.toArray()) {
        const disabledSeriesNames = trainingReportBlockComponent.getDisabledSeriesNames();
        if (disabledSeriesNames && disabledSeriesNames.length) {
          for (const disabledSeriesName of disabledSeriesNames) {
            const data = disabledSeriesName.split(' / ');
            if (data && data.length > 2) {
              const item = new EventBlockSeries();
              item.blockId = trainingReportBlockComponent.data.id;
              item.firstLastPersonName = data[0];
              item.exercise = data[1];
              item.parameter = data[2];

              disabledEventBlockSeries.push(item);
            }
          }
        }
      }
    }
    return disabledEventBlockSeries;
  }

}

export class EventBlockSeries {
  public blockId: number;
  public firstLastPersonName: string;
  public exercise: string;
  public parameter: string;
  public unit: string;
}
