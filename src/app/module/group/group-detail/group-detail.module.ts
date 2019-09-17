import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule, MatRippleModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { GroupHeadModule } from '../group-head/group-head.module';
import { GroupScheduleModule } from '../group-schedule/group-schedule.module';
import { GroupDetailComponent } from './group-detail/group-detail.component';

@NgModule({
  declarations: [GroupDetailComponent],
  entryComponents: [GroupDetailComponent],
  exports: [GroupDetailComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatRippleModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    GroupHeadModule,
    GroupScheduleModule
  ]
})
export class GroupDetailModule {
}
