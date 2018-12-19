import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsListComponent} from './persons-list/persons-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxGridModule} from '../../../components/ngx-grid/ngx-grid.module';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {NgxTextBoxModule} from '../../../components/ngx-text-box/ngx-text-box.module';
import {DxDateBoxModule, DxSelectBoxModule} from 'devextreme-angular';
import {InputSelectModule} from '../../../components/input-select/input-select.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxGridModule,
    NgxImageModule,
    NgxTextBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    InputSelectModule
  ],
  declarations: [PersonsListComponent],
  exports: [PersonsListComponent]
})
export class PersonsListModule {
}
