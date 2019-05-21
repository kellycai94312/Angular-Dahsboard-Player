import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarComponent} from './calendar/calendar.component';
import {CalendarModule as AngularCalendar, DateAdapter} from 'angular-calendar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {TranslateModule} from '@ngx-translate/core';
import {NgxBusyModule} from '../../../directives/ngx-busy/ngx-busy.module';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [
    CommonModule,
    AngularCalendar.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FlexLayoutModule,
    TranslateModule.forChild(),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    NgxBusyModule
  ]
})
export class CalendarModule {
}
