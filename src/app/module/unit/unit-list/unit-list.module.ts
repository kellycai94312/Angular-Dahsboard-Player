import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitListComponent} from './unit-list/unit-list.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {UnitItemModule} from '../unit-item/unit-item.module';
import {UnitWindowService} from '../../../services/windows/unit-window/unit-window.service';
import {EditUnitModule} from '../edit-unit/edit-unit.module';

@NgModule({
  declarations: [UnitListComponent],
  providers: [UnitWindowService],
  exports: [UnitListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    NgxInputModule,
    NgxVirtualScrollModule,
    UnitItemModule,
    EditUnitModule
  ]
})
export class UnitListModule {
}
