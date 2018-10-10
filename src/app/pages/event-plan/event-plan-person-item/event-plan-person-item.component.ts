import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseComponent} from '../../../data/local/component/base/base-component';
import {EventPlanPerson} from '../../../data/remote/model/training/plan/event-plan-person';
import {ImageType} from '../../../data/remote/model/file/image/image-type';
import {FileClass} from '../../../data/remote/model/file/base/file-class';
import {ImageFormat} from '../../../data/local/image-format';
import {PropertyConstant} from '../../../data/local/property-constant';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../utils/app-helper';

@Component({
  selector: 'app-event-plan-person-item',
  templateUrl: './event-plan-person-item.component.html',
  styleUrls: ['./event-plan-person-item.component.scss']
})
export class EventPlanPersonItemComponent extends BaseComponent<EventPlanPerson> {

  public readonly imageTypeClass = ImageType;
  public readonly fileClassClass = FileClass;
  public readonly imageFormatClass = ImageFormat;
  public readonly propertyConstantClass = PropertyConstant;
  public readonly userRoleEnumClass = UserRoleEnum;

  @Input('class')
  public classes: string;

  @Output()
  public dblClick: EventEmitter<EventPlanPerson>;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    super();
    this.classes = '';
    this.dblClick = new EventEmitter<EventPlanPerson>();
  }

  public onDblClick() {
    this.dblClick.emit(this.data);
  }

  public async onStatusChanged() {
    await this._appHelper.trySave(async () => {
      this.data = await this._participantRestApiService.updateEventPlanPerson(this.data, {}, {eventPlanId: this.data.eventPlan.id, eventPlanPersonId: this.data.id});
    });
  }

}
