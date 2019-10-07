import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDateModule } from '../../ngx/ngx-date/ngx-date.module';
import { NgxInputModule } from '../../ngx/ngx-input/ngx-input.module';
import { NgxSelectModule } from '../../ngx/ngx-select/ngx-select.module';
import { EditPersonRankComponent } from './edit-person-rank/edit-person-rank.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxSelectModule,
    NgxInputModule,
    NgxDateModule
  ],
  declarations: [EditPersonRankComponent],
  entryComponents: [EditPersonRankComponent],
  exports: [EditPersonRankComponent]
})
export class EditPersonRankModule {
}
