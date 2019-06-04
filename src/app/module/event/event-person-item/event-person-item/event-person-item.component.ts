import {Component, Input} from '@angular/core';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {EventPerson} from '../../../../data/remote/model/event/person/event-person';
import {AppHelper} from '../../../../utils/app-helper';
import {EventPersonTypeEnum} from '../../../../data/remote/model/event/person/event-person-type-enum';
import {BaseEventApiService} from '../../../../data/remote/rest-api/api/event/base-event-api/base-event-api.service';
import {ModalBuilderService} from '../../../../service/modal-builder/modal-builder.service';
import {BaseEvent} from '../../../../data/remote/model/event/base/base-event';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {PreviewNamedObjectComponent} from '../../../../components/named-object/preview-named-object/preview-named-object.component';
import {IdRequest} from '../../../../data/remote/request/id-request';

@Component({
  selector: 'app-event-person-item',
  templateUrl: './event-person-item.component.html',
  styleUrls: ['./event-person-item.component.scss']
})
export class EventPersonItemComponent extends BaseComponent<EventPerson> {

  @Input()
  public eventPersonTypeEnum: EventPersonTypeEnum;

  @Input()
  public event: BaseEvent;

  @Input()
  public canEdit: boolean;

  constructor(private _appHelper: AppHelper,
              private _modalBuilderService: ModalBuilderService,
              private _baseEventApiService: BaseEventApiService) {
    super();
  }

  public async onEditPositions(): Promise<void> {
    if (this.data.id) {
      const dialogResult = await this._modalBuilderService.showSelectionItemsModal(this.data.positions, async query => {
          return this._baseEventApiService.getEventVacancies(this.event, {count: PropertyConstant.pageSizeMax}).toPromise();
        },
        PreviewNamedObjectComponent, async (component, data) => {
          component.name = `${data.name} (${data.activity.name})`;
        });
      if (dialogResult.result) {
        this._baseEventApiService.updateEventPersonType(this.event, {
          personId: this.data.person.id,
          eventPersonTypeEnum: this.eventPersonTypeEnum,
          positionIds: dialogResult.data.map(x => new IdRequest(x.id))
        }).subscribe(value => {
          this.data = value.eventPerson;
        });
      }
    }
  }

}
