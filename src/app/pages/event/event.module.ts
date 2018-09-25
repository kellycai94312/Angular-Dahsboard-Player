import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventPageComponent} from './event-page/event-page.component';
import {EventsPageComponent} from './events-page/events-page.component';
import {EventRoutingModule} from './event-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {GameStepBasePageComponent} from './event-page/game/steps/game-step-base-page/game-step-base-page.component';
import {GameStepPersonsPageComponent} from './event-page/game/steps/game-step-persons-page/game-step-persons-page.component';
import {GameStepExecutionPageComponent} from './event-page/game/steps/game-step-execution-page/game-step-execution-page.component';
import {GameStepsManagerPageComponent} from './event-page/game/steps/game-steps-manager-page/game-steps-manager-page.component';
import {TabModule} from '../../components/tab/tab.module';
import {DxButtonModule, DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {ModalSelectPageComponent} from '../../components/modal-select-page/modal-select-page.component';
import {ModalSelectPageModule} from '../../components/modal-select-page/modal-select-page.module';
import {NamedObjectItemModule} from '../../components/named-object-item/named-object-item.module';
import {TrainingPersonsSelectionModule} from '../../components/training-persons-selection/training-persons-selection.module';
import {TrainingPersonModule} from '../../components/training-person/training-person.module';
import {InputSelectModule} from '../../components/input-select/input-select.module';
import {GroupPageModule} from '../groups/group-page.module';
import {CalendarUtilsModule} from '../../components/calendar-utils/calendar-utils.module';
import {CalendarModule} from 'angular-calendar';
import {EventsListComponent} from './events-page/events-list/events-list.component';
import {EventsCalendarComponent} from './events-page/events-calendar/events-calendar.component';
import {EventCalendarItemComponent} from './events-page/events-calendar/event-calendar-item/event-calendar-item.component';
import {EventCalendarMonthModalComponent} from './events-page/events-calendar/event-calendar-month-modal/event-calendar-month-modal.component';
import {CustomDateFormatter} from '../../components/calendar-utils/custom-date-formatter.prodiver';
import {EventsCalendarService} from './events-page/events-calendar/events-calendar.service';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {NgxSplitButtonModule} from '../../components/ngx-split-button/ngx-split-button.module';
import {NgxGridModule} from '../../components/ngx-grid/ngx-grid.module';
import {ReportModule} from '../../components/report/report.module';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    TranslateModule.forChild(),
    NgxVirtualScrollModule,
    FormsModule,
    TabModule,
    DxDateBoxModule,
    DxTextAreaModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxNumberBoxModule,
    ModalSelectPageModule,
    NamedObjectItemModule,
    TrainingPersonModule,
    TrainingPersonsSelectionModule,
    InputSelectModule,
    GroupPageModule,
    CalendarModule.forRoot(),
    CalendarUtilsModule,
    NgxSplitButtonModule,
    NgxGridModule,
    ReportModule
  ],
  declarations: [
    EventPageComponent,
    EventsPageComponent,
    GameStepBasePageComponent,
    GameStepPersonsPageComponent,
    GameStepExecutionPageComponent,
    GameStepsManagerPageComponent,
    EventsListComponent,
    EventsCalendarComponent,
    EventCalendarItemComponent,
    EventCalendarMonthModalComponent
  ],
  entryComponents: [
    ModalSelectPageComponent,
    EventCalendarMonthModalComponent
  ],
  providers: [
    CustomDateFormatter,
    EventsCalendarService
  ]
})
export class EventModule {
}
