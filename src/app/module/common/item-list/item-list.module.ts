import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemListComponent} from './item-list/item-list.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';

@NgModule({
  declarations: [ItemListComponent],
  exports: [ItemListComponent],
  imports: [
    CommonModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    NgxInputModule,
    NgxVirtualScrollModule
  ]
})
export class ItemListModule {
}
