import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditGroupComponent} from './edit-group/edit-group.component';
import {NgxInputModule} from '../../../components/ngx-input/ngx-input.module';
import {DxNumberBoxModule, DxSelectBoxModule} from 'devextreme-angular';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DxSelectBoxModule,
    DxNumberBoxModule,
    NgxInputModule
  ],
  declarations: [EditGroupComponent],
  entryComponents: [EditGroupComponent],
  exports: [EditGroupComponent]
})
export class EditGroupModule {
}
