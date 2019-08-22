import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditGroupComponent} from './edit-group/edit-group.component';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [EditGroupComponent],
  entryComponents: [EditGroupComponent],
  exports: [EditGroupComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxInputModule,
    NgxSelectModule
  ]
})
export class EditGroupModule {
}
