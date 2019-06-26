import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParameterListComponent} from './parameter-list/parameter-list.component';
import {ParameterItemModule} from '../parameter-item/parameter-item.module';
import {ParameterWindowService} from '../../../services/windows/parameter-window/parameter-window.service';
import {EditParameterModule} from '../edit-parameter/edit-parameter.module';
import {UnitApiService} from '../../../data/remote/rest-api/api/unit/unit-api.service';
import {ParameterApiService} from '../../../data/remote/rest-api/api/parameter/parameter-api.service';
import {ItemListModule} from '../../common/item-list/item-list.module';

@NgModule({
  declarations: [ParameterListComponent],
  providers: [
    UnitApiService,
    ParameterApiService,
    ParameterWindowService
  ],
  exports: [ParameterListComponent],
  imports: [
    CommonModule,
    ItemListModule,
    ParameterItemModule,
    EditParameterModule
  ]
})
export class ParameterListModule {
}
