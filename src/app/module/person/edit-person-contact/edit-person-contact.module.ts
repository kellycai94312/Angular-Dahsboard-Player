import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditPersonContactComponent} from './edit-person-contact/edit-person-contact.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';

@NgModule({
  declarations: [EditPersonContactComponent],
  entryComponents: [EditPersonContactComponent],
  exports: [EditPersonContactComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxInputModule,
    NgxSelectModule
  ]
})
export class EditPersonContactModule {
}
