import {Component, Input, OnInit} from '@angular/core';
import {BaseTraining} from '../../../../../data/remote/model/training/base/base-training';
import {CalendarEvent} from 'angular-calendar';
import {EventsCalendarService} from '../events-calendar.service';
import {PropertyConstant} from '../../../../../data/local/property-constant';
import {Router} from '@angular/router';
import {IconEnum} from '../../../../../components/ngx-button/model/icon-enum';
import {TrainingDiscriminator} from '../../../../../data/remote/model/training/base/training-discriminator';
import {TemplateModalService} from '../../../../../service/template-modal.service';

@Component({
  selector: 'app-event-calendar-item',
  templateUrl: './event-calendar-item.component.html',
  styleUrls: ['./event-calendar-item.component.scss']
})
export class EventCalendarItemComponent implements OnInit {

  public readonly propertyConstantClass = PropertyConstant;
  public readonly iconEnumClass = IconEnum;

  @Input()
  event: CalendarEvent<{ event: BaseTraining }>;

  @Input()
  displayInline: boolean;

  @Input()
  displayBorderBottom: boolean;

  fontColor: string;

  constructor(private _eventsCalendarService: EventsCalendarService,
              private _router: Router,
              private _templateModalService: TemplateModalService) {
    this.displayInline = false;
    this.displayBorderBottom = false;
  }

  ngOnInit(): void {
    if (this.event) {
      this.fontColor = this._eventsCalendarService.getTrainingColor(this.event.meta.event).font;
    }
  }

  public edit = async () => {
    const dialogResult = await this._templateModalService.showEditEventModal(this.event.meta.event);
    if (dialogResult.result) {
      this.event.meta.event = dialogResult.data;
    }
  };

  public async onShow() {
    if (this.event.meta.event.discriminator === TrainingDiscriminator.GAME) {
      await this._router.navigate(['/event', this.event.meta.event.id]);
    }
  }

}
