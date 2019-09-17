import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { GroupScheduleComponent } from './group-schedule/group-schedule.component';

@NgModule({
  declarations: [GroupScheduleComponent],
  exports: [GroupScheduleComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class GroupScheduleModule {
}
