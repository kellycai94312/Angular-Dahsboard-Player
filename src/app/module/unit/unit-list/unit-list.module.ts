import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitListComponent} from './unit-list/unit-list.component';
import {UnitItemModule} from '../unit-item/unit-item.module';
import {UnitWindowService} from '../../../services/windows/unit-window/unit-window.service';
import {EditUnitModule} from '../edit-unit/edit-unit.module';
import {ItemListModule} from '../../common/item-list/item-list.module';

@NgModule({
  declarations: [UnitListComponent],
  providers: [UnitWindowService],
  exports: [UnitListComponent],
  imports: [
    CommonModule,
    ItemListModule,
    UnitItemModule,
    EditUnitModule
  ]
})
export class UnitListModule {
}
