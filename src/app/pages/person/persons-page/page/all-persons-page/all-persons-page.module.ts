import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllPersonsPageRoutingModule} from './all-persons-page-routing.module';
import {AllPersonsPageComponent} from './all-persons-page/all-persons-page.component';
import {PersonsListModule} from '../../../../../module/person/persons-list/persons-list.module';

@NgModule({
  imports: [
    CommonModule,
    AllPersonsPageRoutingModule,
    PersonsListModule
  ],
  declarations: [AllPersonsPageComponent]
})
export class AllPersonsPageModule {
}
