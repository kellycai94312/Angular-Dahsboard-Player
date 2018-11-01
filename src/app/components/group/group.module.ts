import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupTransitionComponent} from './group-transition/group-transition.component';
import {TranslateModule} from '@ngx-translate/core';
import {AttachFileModule} from '../attach-file/attach-file.module';
import {NgxGridModule} from '../ngx-grid/ngx-grid.module';
import {DxDateBoxModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {InputSelectModule} from '../input-select/input-select.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    AttachFileModule,
    NgxGridModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxDateBoxModule,
    InputSelectModule
  ],
  declarations: [GroupTransitionComponent],
  entryComponents: [GroupTransitionComponent],
  exports: [GroupTransitionComponent]
})
export class GroupModule {
}
