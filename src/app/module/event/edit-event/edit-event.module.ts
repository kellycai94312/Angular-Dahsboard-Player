import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralStepEditEventComponent} from './general-step-edit-event/general-step-edit-event.component';
import {PersonsStepEditEventComponent} from './persons-step-edit-event/persons-step-edit-event.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxButtonModule} from '../../../components/ngx-button/ngx-button.module';
import {NgxInputModule} from '../../../components/ngx-input/ngx-input.module';
import {DxCheckBoxModule, DxDateBoxModule, DxSelectBoxModule, DxTextAreaModule} from 'devextreme-angular';
import {InputSelectModule} from '../../../components/input-select/input-select.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    InputSelectModule,
    NgxButtonModule,
    NgxInputModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxSelectBoxModule
  ],
  declarations: [
    GeneralStepEditEventComponent,
    PersonsStepEditEventComponent
  ],
  entryComponents: [
    GeneralStepEditEventComponent,
    PersonsStepEditEventComponent
  ]
})
export class EditEventModule {
}
