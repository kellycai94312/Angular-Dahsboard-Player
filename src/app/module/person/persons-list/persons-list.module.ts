import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsListComponent} from './persons-list/persons-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxTextBoxModule} from '../../../components/ngx-text-box/ngx-text-box.module';
import {DxDateBoxModule, DxSelectBoxModule} from 'devextreme-angular';
import {InputSelectModule} from '../../../components/input-select/input-select.module';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {PersonItemModule} from '../person-item/person-item.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxVirtualScrollModule,
    NgxTextBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    InputSelectModule,
    PersonItemModule
  ],
  declarations: [PersonsListComponent],
  exports: [PersonsListComponent]
})
export class PersonsListModule {
}
