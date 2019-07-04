import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UnitsRoutingModule} from './units-routing.module';
import {UnitsComponent} from './units/units.component';
import {UnitListModule} from '../../../module/unit/unit-list/unit-list.module';

@NgModule({
  declarations: [UnitsComponent],
  imports: [
    CommonModule,
    UnitsRoutingModule,
    UnitListModule
  ]
})
export class UnitsModule {
}
