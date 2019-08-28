import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditGroupPositionComponent} from './edit-group-position/edit-group-position.component';
import {NamedObjectModule} from '../../../../components/named-object/named-object.module';
import {NgxSelectModule} from '../../../ngx/ngx-select/ngx-select.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [EditGroupPositionComponent],
  entryComponents: [EditGroupPositionComponent],
  exports: [EditGroupPositionComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxSelectModule,
    NamedObjectModule
  ]
})
export class EditGroupPositionModule {
}
