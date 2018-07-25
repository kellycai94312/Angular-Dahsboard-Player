import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {Direction} from 'ngx-bootstrap/carousel/carousel.component';
import {AppHelper} from '../../../../utils/app-helper';
import {ActivatedRoute, Router} from '@angular/router';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SplitButtonItem} from '../../../../components/ngx-split-button/bean/split-button-item';
import {EventReportService} from '../service/event-report.service';
import {TableTrainingBlock} from '../../../../data/remote/model/training/report/table-training-block';
import {TranslateService} from '@ngx-translate/core';
import {BaseTrainingBlock} from '../../../../data/remote/model/training/report/base/base-training-block';

@Component({
  selector: 'app-event-blocks',
  templateUrl: './event-blocks.component.html',
  styleUrls: ['./event-blocks.component.scss']
})
export class EventBlocksComponent implements OnInit {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public readonly splitButtonItems: SplitButtonItem[];

  private _trainingReportId: number;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _modalService: NgbModal,
              private _appHelper: AppHelper,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _eventReportService: EventReportService,
              private _translateService: TranslateService) {
    this.splitButtonItems = [
      {
        nameKey: 'add',
        default: true,
        callback: async () => {
          try {
            let trainingBlock = new TableTrainingBlock();
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
          // TODO: Add business logic
        }
      },
      {
        nameKey: 'exportToExcel',
        callback: async () => {
          // TODO: Add business logic
        }
      },
      {
        nameKey: 'print',
        callback: async () => {
          // TODO: Add business logic
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

  public async onShow(baseTrainingBlock: BaseTrainingBlock): Promise<void> {
    await this._router.navigate([baseTrainingBlock.id], {relativeTo: this._activatedRoute});

  }

  private async resetItems(): Promise<void> {
    setTimeout(async () => {
      await this.ngxVirtualScrollComponent.reset();
    });
  }

}
