import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupScheduleRoutingModule} from './group-schedule-routing.module';
import {GroupScheduleComponent} from './group-schedule/group-schedule.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [GroupScheduleComponent],
  imports: [
    CommonModule,
    GroupScheduleRoutingModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class GroupScheduleModule {
}
