import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParameterListComponent} from './parameter-list/parameter-list.component';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {ParameterItemModule} from '../parameter-item/parameter-item.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {ParameterWindowService} from '../../../services/windows/parameter-window/parameter-window.service';
import {EditParameterModule} from '../edit-parameter/edit-parameter.module';
import {UnitApiService} from '../../../data/remote/rest-api/api/unit/unit-api.service';
import {ParameterApiService} from '../../../data/remote/rest-api/api/parameter/parameter-api.service';

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
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    NgxInputModule,
    NgxVirtualScrollModule,
    ParameterItemModule,
    EditParameterModule
  ]
})
export class ParameterListModule {
}
