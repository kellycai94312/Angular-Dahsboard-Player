import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsPageComponent} from './persons-page/persons-page.component';
import {PersonsPageRoutingModule} from './persons-page-routing.module';
import {NgxTabModule} from '../../../components/ngx-tab/ngx-tab.module';
import {EditPersonModule} from '../../../module/person/edit-person/edit-person.module';

@NgModule({
  imports: [
    CommonModule,
    PersonsPageRoutingModule,
    NgxTabModule,
    EditPersonModule
  ],
  declarations: [PersonsPageComponent]
})
export class PersonsPageModule {
}
