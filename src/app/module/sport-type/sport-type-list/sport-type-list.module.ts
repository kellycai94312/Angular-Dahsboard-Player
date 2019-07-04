import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SportTypeListComponent} from './sport-type-list/sport-type-list.component';
import {ItemListModule} from '../../common/item-list/item-list.module';
import {SportTypeItemModule} from '../sport-type-item/sport-type-item.module';

@NgModule({
  declarations: [SportTypeListComponent],
  exports: [SportTypeListComponent],
  imports: [
    CommonModule,
    ItemListModule,
    SportTypeItemModule
  ]
})
export class SportTypeListModule {
}
