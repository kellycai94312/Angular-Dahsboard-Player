import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditGroupDetailsComponent} from './edit-group-details/edit-group-details.component';
import {NgxInputModule} from '../../../ngx/ngx-input/ngx-input.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {NgxSelectModule} from '../../../ngx/ngx-select/ngx-select.module';

@NgModule({
  declarations: [EditGroupDetailsComponent],
  entryComponents: [EditGroupDetailsComponent],
  exports: [EditGroupDetailsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxSelectModule
  ]
})
export class EditGroupDetailsModule {
}
