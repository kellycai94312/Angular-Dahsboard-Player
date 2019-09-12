import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsRoutingModule} from './persons-routing.module';
import {PersonsComponent} from './persons/persons.component';
import {PersonsListModule} from '../../../module/person/persons-list/persons-list.module';

@NgModule({
  declarations: [PersonsComponent],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    PersonsListModule
  ]
})
export class PersonsModule {
}
