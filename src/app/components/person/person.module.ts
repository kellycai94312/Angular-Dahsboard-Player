import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonComponent} from './person.component';
import {RouterModule} from '@angular/router';
import {ImageModule} from '../image/image.module';
import {AttachFileModule} from '../attach-file/attach-file.module';
import {NgxGridModule} from '../ngx-grid/ngx-grid.module';
import {DxCheckBoxModule, DxDateBoxModule, DxSelectBoxModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {InputSelectModule} from '../input-select/input-select.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxButtonModule} from '../ngx-button/ngx-button.module';
import {NgxSelectionModule} from '../ngx-selection/ngx-selection.module';
import {NamedObjectModule} from '../named-object/named-object.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    TranslateModule.forChild(),
    ImageModule,
    AttachFileModule,
    NgxGridModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    InputSelectModule,
    NgxButtonModule,
    NgxSelectionModule,
    NamedObjectModule
  ],
  declarations: [
    PersonComponent
  ],
  entryComponents: [
    PersonComponent
  ],
  exports: [
    PersonComponent
  ]
})
export class PersonModule {
}
