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
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ListRequest} from '../../../../../../data/remote/request/list-request';
import {ModalSelectPageComponent} from '../../../../../../components/modal-select-page/modal-select-page.component';
import {NamedObjectItemComponent} from '../../../../../../components/named-object-item/named-object-item.component';
import {TrainingBlockQuery} from '../../../../../../data/remote/rest-api/query/training-block-query';
import {TrainingBlock} from '../../../../../../data/remote/model/training/report/training-block';
import {NameWrapper} from '../../../../../../data/local/name-wrapper';

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
              private _appHelper: AppHelper,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _translateObjectService: TranslateObjectService,
              private _modalService: NgbModal) {
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
            await this._participantRestApiService.removeTrainingBlock({trainingReportId: this.trainingBlock.trainingReport.id, trainingBlockId: this.trainingBlock.id});
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
    const trainingBlockQuery = new TrainingBlockQuery();
    trainingBlockQuery.count = PropertyConstant.pageSize;
    trainingBlockQuery.unassigned = true;

    const ref = this._modalService.open(ModalSelectPageComponent, {size: 'lg'});
    const componentInstance = ref.componentInstance as ModalSelectPageComponent<Group>;
    componentInstance.headerNameKey = 'edit';
    componentInstance.component = NamedObjectItemComponent;
    componentInstance.pageQuery = trainingBlockQuery;
    componentInstance.getItems = async pageQuery => {
      return await this._participantRestApiService.getTrainingBlockGroups(
        {},
        pageQuery,
        {trainingBlockId: this.trainingBlock.id, trainingReportId: this.trainingBlock.trainingReport.id});
    };
    componentInstance.onSave = async selectedItems => {
      try {
        this.groups = await this._participantRestApiService.updateTrainingBlockGroups(new ListRequest(selectedItems),
          {},
          {trainingBlockId: this.trainingBlock.id, trainingReportId: this.trainingBlock.trainingReport.id});
        ref.dismiss();
      } catch (e) {
        await this._appHelper.showErrorMessage('saveError');
      }
    };
    await componentInstance.initialize(this.groups);
  };

  public onEventTypeChanged(val: NameWrapper<TrainingDiscriminator>) {
    this.trainingBlock.trainingType = val ? val.data : null;
  }

}
