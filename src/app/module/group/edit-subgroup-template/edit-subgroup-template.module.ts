import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditSubgroupTemplateComponent} from './edit-subgroup-template/edit-subgroup-template.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxInputModule} from '../../../components/ngx-input/ngx-input.module';
import {InputSelectModule} from '../../../components/input-select/input-select.module';
import {NgxCheckBoxModule} from '../../../components/ngx-check-box/ngx-check-box.module';
import {NgxGridModule} from '../../../components/ngx-grid/ngx-grid.module';

@NgModule({
  declarations: [EditSubgroupTemplateComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxGridModule,
    NgxCheckBoxModule,
    InputSelectModule
  ],
  entryComponents: [EditSubgroupTemplateComponent],
  exports: [EditSubgroupTemplateComponent]
})
export class EditSubgroupTemplateModule {
}
