import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputSelectModule} from '../../../components/input-select/input-select.module';
import {EditSubgroupComponent} from './edit-subgroup/edit-subgroup.component';
import {NgxInputModule} from '../../../components/ngx-input/ngx-input.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [EditSubgroupComponent],
  entryComponents: [EditSubgroupComponent],
  exports: [EditSubgroupComponent],
  imports: [
    CommonModule,
    InputSelectModule,
    NgxInputModule,
    TranslateModule.forChild()
  ]
})
export class EditSubgroupModule {
}
