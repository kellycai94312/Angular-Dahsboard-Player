import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsListComponent} from './persons-list/persons-list.component';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {PersonItemModule} from '../person-item/person-item.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    NgxVirtualScrollModule,
    PersonItemModule,
    FlexLayoutModule
  ],
  declarations: [PersonsListComponent],
  exports: [PersonsListComponent]
})
export class PersonsListModule {
}
