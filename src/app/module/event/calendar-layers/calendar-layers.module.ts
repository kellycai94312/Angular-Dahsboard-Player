import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarLayersComponent} from './calendar-layers/calendar-layers.component';
import {MatCardModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {GroupItemModule} from '../../group/group-item/group-item.module';
import {ChipListModule} from '../../common/chip-list/chip-list.module';

@NgModule({
  declarations: [CalendarLayersComponent],
  exports: [CalendarLayersComponent],
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule.forChild(),
    GroupItemModule,
    ChipListModule
  ]
})
export class CalendarLayersModule {
}
