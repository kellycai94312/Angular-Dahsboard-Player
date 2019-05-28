import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditBaseEventComponent} from './edit-base-event/edit-base-event.component';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DxDateBoxModule} from 'devextreme-angular';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [EditBaseEventComponent],
  entryComponents: [EditBaseEventComponent],
  exports: [EditBaseEventComponent],
  imports: [
    CommonModule,
    NgxInputModule,
    NgxSelectModule,
    FlexLayoutModule,
    DxDateBoxModule,
    TranslateModule.forChild()
  ]
})
export class EditBaseEventModule {
}
