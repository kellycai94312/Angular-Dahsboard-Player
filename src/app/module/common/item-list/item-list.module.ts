import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemListComponent} from './item-list/item-list.component';
import {MatDividerModule, MatRippleModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {ListHeadingModule} from '../list-heading/list-heading.module';

@NgModule({
  declarations: [ItemListComponent],
  exports: [ItemListComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    MatDividerModule,
    FlexLayoutModule,
    NgxVirtualScrollModule,
    ListHeadingModule
  ]
})
export class ItemListModule {
}
