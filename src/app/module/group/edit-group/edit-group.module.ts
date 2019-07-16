import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditGroupComponent} from './edit-group/edit-group.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxSelectModule
  ],
  declarations: [EditGroupComponent],
  entryComponents: [EditGroupComponent],
  exports: [EditGroupComponent]
})
export class EditGroupModule {
}
