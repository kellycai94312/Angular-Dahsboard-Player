import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditSubgroupGroupComponent} from './edit-subgroup-group/edit-subgroup-group.component';
import {TranslateModule} from '@ngx-translate/core';
import {InputSelectModule} from '../../../components/input-select/input-select.module';

@NgModule({
  declarations: [EditSubgroupGroupComponent],
  exports: [EditSubgroupGroupComponent],
  entryComponents: [EditSubgroupGroupComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    InputSelectModule
  ]
})
export class EditSubgroupGroupModule {
}
