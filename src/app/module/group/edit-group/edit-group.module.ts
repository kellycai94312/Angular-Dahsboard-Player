import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDateModule } from '../../ngx/ngx-date/ngx-date.module';
import { NgxInputModule } from '../../ngx/ngx-input/ngx-input.module';
import { NgxSelectModule } from '../../ngx/ngx-select/ngx-select.module';
import { EditGroupComponent } from './edit-group/edit-group.component';

@NgModule({
  declarations: [EditGroupComponent],
  entryComponents: [EditGroupComponent],
  exports: [EditGroupComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxInputModule,
    NgxSelectModule,
    NgxDateModule
  ]
})
export class EditGroupModule {
}
