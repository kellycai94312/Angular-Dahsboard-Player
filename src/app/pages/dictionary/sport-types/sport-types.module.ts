import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SportTypesRoutingModule} from './sport-types-routing.module';
import {SportTypesComponent} from './sport-types/sport-types.component';
import {SportTypeListModule} from '../../../module/sport-type/sport-type-list/sport-type-list.module';

@NgModule({
  declarations: [SportTypesComponent],
  imports: [
    CommonModule,
    SportTypesRoutingModule,
    SportTypeListModule
  ]
})
export class SportTypesModule {
}
