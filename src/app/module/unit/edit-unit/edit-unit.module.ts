import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditUnitComponent} from './edit-unit/edit-unit.component';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MediaLibraryModule} from '../../library/media-library/media-library.module';

@NgModule({
  declarations: [EditUnitComponent],
  entryComponents: [EditUnitComponent],
  exports: [EditUnitComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FlexLayoutModule,
    FormsModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxSelectModule,
    MediaLibraryModule
  ]
})
export class EditUnitModule {
}
