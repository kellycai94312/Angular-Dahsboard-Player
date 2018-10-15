import {Component, Input, OnInit} from '@angular/core';
import {BaseTraining} from '../../../../../data/remote/model/training/base/base-training';
import {CalendarEvent} from 'angular-calendar';
import {EventsCalendarService} from '../events-calendar.service';
import {PropertyConstant} from '../../../../../data/local/property-constant';
import {Router} from '@angular/router';
import {IconEnum} from '../../../../../components/ngx-button/model/icon-enum';
import {TrainingDiscriminator} from '../../../../../data/remote/model/training/base/training-discriminator';
import {NgxModalService} from '../../../../../components/ngx-modal/service/ngx-modal.service';
import {EditEventComponent} from '../../../edit-event/edit-event.component';

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
              private _ngxModalService: NgxModalService) {
    this.displayInline = false;
    this.displayBorderBottom = false;
  }

  ngOnInit(): void {
    if (this.event) {
      this.fontColor = this._eventsCalendarService.getTrainingColor(this.event.meta.event).font;
    }
  }

  public edit = async () => {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(EditEventComponent, async component => {
      component.manualInitialization = true;
      await component.initialize(this.event.meta.event);

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          if (await this._ngxModalService.save(modal, component)) {
            this.event.meta.event = component.data;
          }
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    });
  };

  public async onShow() {
    if (this.event.meta.event.discriminator === TrainingDiscriminator.GAME) {
      await this._router.navigate(['/event', this.event.meta.event.id]);
    }
  }

}
