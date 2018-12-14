import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsPageComponent} from './persons-page/persons-page.component';
import {PersonsPageRoutingModule} from './persons-page-routing.module';
import {NgxTabModule} from '../../../components/ngx-tab/ngx-tab.module';

@NgModule({
  imports: [
    CommonModule,
    PersonsPageRoutingModule,
    NgxTabModule
  ],
  declarations: [PersonsPageComponent]
})
export class PersonsPageModule {
}
