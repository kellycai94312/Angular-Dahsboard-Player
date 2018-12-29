import {Component, OnInit} from '@angular/core';
import {EventReportService} from '../../../service/event-report.service';
import {SplitButtonItem} from '../../../../../../components/ngx-split-button/bean/split-button-item';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingDiscriminator} from '../../../../../../data/remote/model/training/base/training-discriminator';
import {TranslateObjectService} from '../../../../../../shared/translate-object.service';
import {SportType} from '../../../../../../data/remote/model/sport-type';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {Location} from '../../../../../../data/remote/model/location';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {TrainingBlock} from '../../../../../../data/remote/model/training/report/training-block';
import {NameWrapper} from '../../../../../../data/local/name-wrapper';
import {TemplateModalService} from '../../../../../../service/template-modal.service';
import {GroupItemComponent} from '../../../../../../module/group/group-item/group-item/group-item.component';
import {TrainingBlockQuery} from '../../../../../../data/remote/rest-api/query/training-block-query';

@Component({
  selector: 'app-general-event-block',
  templateUrl: './general-event-block.component.html',
  styleUrls: ['./general-event-block.component.scss']
})
export class GeneralEventBlockComponent implements OnInit {

  public readonly splitButtonItems: SplitButtonItem[];
  public eventTypes: NameWrapper<TrainingDiscriminator>[];
  public selectedEventType: NameWrapper<TrainingDiscriminator>;
  public trainingBlock: TrainingBlock;
  public sportTypes: SportType[];
  public locations: Location[];
  public groups: Group[];

  constructor(private _eventReportService: EventReportService,
              private _participantRestApiService: ParticipantRestApiService,
              private _templateModalService: TemplateModalService,
              private _appHelper: AppHelper,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _translateObjectService: TranslateObjectService) {
    this.splitButtonItems = [
      {
        nameKey: 'save',
        default: true,
        callback: async () => {
          await this._appHelper.trySave(async () => {
            this.trainingBlock.dateFrom = this._appHelper.getGmtDate(this.trainingBlock.dateFrom);
            this.trainingBlock.dateTo = this._appHelper.getGmtDate(this.trainingBlock.dateTo);

            this.trainingBlock = await this._participantRestApiService.updateTrainingBlock(
              this.trainingBlock,
              {},
              {trainingReportId: this.trainingBlock.trainingReport.id, trainingBlockId: this.trainingBlock.id}
            );
            this._eventReportService.setSelectedTrainingBlock(this.trainingBlock);
          });
        }
      },
      {
        nameKey: 'remove',
        callback: async () => {
          await this._appHelper.tryRemove(async () => {
            await this._participantRestApiService.removeTrainingBlock({
              trainingReportId: this.trainingBlock.trainingReport.id,
              trainingBlockId: this.trainingBlock.id
            });
            await this._router.navigate(['../../'], {relativeTo: this._activatedRoute});
          });
        }
      }
    ];
    this.eventTypes = [];
  }

  async ngOnInit() {
    this.trainingBlock = await this._eventReportService.getSelectedTrainingBlock();

    this.eventTypes = await this._translateObjectService.getTranslatedEnumCollection<TrainingDiscriminator>(TrainingDiscriminator, 'TrainingDiscriminator');
    this.selectedEventType = this.eventTypes.find(x => x.data === this.trainingBlock.trainingType);

    this.sportTypes = (await this._participantRestApiService.getSportTypes({count: PropertyConstant.pageSizeMax})).list;
    this.locations = (await this._participantRestApiService.getLocations({count: PropertyConstant.pageSizeMax})).list;
    this.groups = (await this._participantRestApiService.getTrainingBlockGroups(
      {},
      {unassigned: false, count: PropertyConstant.pageSizeMax},
      {
        trainingBlockId: this.trainingBlock.id, trainingReportId: this.trainingBlock.trainingReport.id
      })).list;
  }

  public onEditGroups = async () => {
    const dialogResult = await this._templateModalService.showSelectionItemsModal(this.groups,
      async (query: TrainingBlockQuery) => {
        query.unassigned = true;
        return await this._participantRestApiService.getTrainingBlockGroups({}, query, {
          trainingBlockId: this.trainingBlock.id,
          trainingReportId: this.trainingBlock.trainingReport.id
        });
      },
      GroupItemComponent,
      async (component, data) => {
        await component.initialize(data);
      },
      {
        title: `${await this._translateObjectService.getTranslation('selection')} ${await this._translateObjectService.getTranslation('groups')}`
      }
    );
    if (dialogResult.result) {
      await this._appHelper.trySave(async () => {
        this.groups = await this._participantRestApiService.updateTrainingBlockGroups({list: dialogResult.data}, {}, {
          trainingBlockId: this.trainingBlock.id,
          trainingReportId: this.trainingBlock.trainingReport.id
        });
      });
    }
  };

  public onEventTypeChanged(val: NameWrapper<TrainingDiscriminator>) {
    this.trainingBlock.trainingType = val ? val.data : null;
  }

}
