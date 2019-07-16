import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditGroupConnectionRequestComponent} from './edit-group-connection-request/edit-group-connection-request.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {InputSelectModule} from '../../../components/input-select/input-select.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';

@NgModule({
  declarations: [EditGroupConnectionRequestComponent],
  exports: [EditGroupConnectionRequestComponent],
  entryComponents: [EditGroupConnectionRequestComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    InputSelectModule,
    NgxSelectModule
  ]
})
export class EditGroupConnectionRequestModule {
}
