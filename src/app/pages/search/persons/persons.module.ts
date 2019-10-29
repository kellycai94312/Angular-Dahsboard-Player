import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListHeadingModule } from 'app/module/common/list-heading/list-heading.module';
import { PersonsListModule } from 'app/module/person/persons-list/persons-list.module';
import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsComponent } from './persons/persons.component';

@NgModule({
  declarations: [PersonsComponent],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    FlexLayoutModule,
    ListHeadingModule,
    PersonsListModule
  ]
})
export class PersonsModule {
}
