import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupTransitionComponent} from './group-transition/group-transition.component';
import {TranslateModule} from '@ngx-translate/core';
import {AttachFileModule} from '../attach-file/attach-file.module';
import {NgxGridModule} from '../ngx-grid/ngx-grid.module';
import {DxCheckBoxModule, DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {InputSelectModule} from '../input-select/input-select.module';
import {EditGroupComponent} from './edit-group/edit-group.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    AttachFileModule,
    NgxGridModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxDateBoxModule,
    DxCheckBoxModule,
    DxNumberBoxModule,
    DxSelectBoxModule,
    InputSelectModule
  ],
  declarations: [GroupTransitionComponent, EditGroupComponent],
  entryComponents: [GroupTransitionComponent, EditGroupComponent],
  exports: [GroupTransitionComponent, EditGroupComponent]
})
export class GroupModule {
}
