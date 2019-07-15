import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupEmployeesPageRoutingModule} from './group-employees-page-routing.module';
import {GroupEmployeesPageComponent} from './group-employees-page/group-employees-page.component';
import {GroupPersonsListModule} from '../../../../../module/group/group-persons-list/group-persons-list.module';
import {NgxSelectModule} from '../../../../../module/ngx/ngx-select/ngx-select.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    GroupEmployeesPageRoutingModule,
    FlexLayoutModule,
    GroupPersonsListModule,
    NgxSelectModule
  ],
  declarations: [GroupEmployeesPageComponent]
})
export class GroupEmployeesPageModule {
}
