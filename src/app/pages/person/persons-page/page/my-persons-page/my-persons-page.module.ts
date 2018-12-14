import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyPersonsPageComponent} from './my-persons-page/my-persons-page.component';
import {PersonsListModule} from '../../../../../module/person/persons-list/persons-list.module';
import {MyPersonsPageRoutingModule} from './my-persons-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MyPersonsPageRoutingModule,
    PersonsListModule
  ],
  declarations: [MyPersonsPageComponent]
})
export class MyPersonsPageModule {
}
