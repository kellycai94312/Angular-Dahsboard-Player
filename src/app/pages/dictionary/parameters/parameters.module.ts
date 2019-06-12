import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParametersComponent} from './parameters/parameters.component';
import {ParameterListModule} from '../../../module/parameter/parameter-list/parameter-list.module';
import {ParametersRoutingModule} from './parameters-routing.module';

@NgModule({
  declarations: [ParametersComponent],
  imports: [
    CommonModule,
    ParametersRoutingModule,
    ParameterListModule
  ]
})
export class ParametersModule {
}
