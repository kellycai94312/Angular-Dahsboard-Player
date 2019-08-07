import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChipListComponent} from './chip-list/chip-list.component';
import {MatButtonModule, MatChipsModule, MatDividerModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ChipListComponent],
  exports: [ChipListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ]
})
export class ChipListModule {
}
