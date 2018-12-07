import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DxCheckBoxModule, DxDateBoxModule, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule} from 'devextreme-angular';
import {NgxModalModule} from '../ngx-modal/ngx-modal.module';
import {NgxButtonModule} from '../ngx-button/ngx-button.module';
import {InputSelectModule} from '../input-select/input-select.module';
import {EditEventComponent} from './edit-event/edit-event.component';
import {NgxTextBoxModule} from '../ngx-text-box/ngx-text-box.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DxTextBoxModule,
    DxTextAreaModule,
    DxCheckBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    NgxModalModule,
    NgxButtonModule,
    NgxTextBoxModule,
    InputSelectModule
  ],
  declarations: [EditEventComponent],
  entryComponents: [EditEventComponent],
  exports: [EditEventComponent]
})
export class EventComponentsModule {
}
