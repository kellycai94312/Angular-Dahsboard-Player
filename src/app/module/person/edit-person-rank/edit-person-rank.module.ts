import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditPersonRankComponent} from './edit-person-rank/edit-person-rank.component';
import {AttachFileModule} from '../../../components/attach-file/attach-file.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxDateModule} from '../../ngx/ngx-date/ngx-date.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxSelectModule,
    NgxInputModule,
    NgxDateModule,
    AttachFileModule
  ],
  declarations: [EditPersonRankComponent],
  entryComponents: [EditPersonRankComponent],
  exports: [EditPersonRankComponent]
})
export class EditPersonRankModule {
}
