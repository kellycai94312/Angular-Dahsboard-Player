import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonPageComponent} from './person-page/person-page.component';
import {PersonPageRoutingModule} from './person-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PersonPageRoutingModule
  ],
  declarations: [PersonPageComponent]
})
export class PersonPageModule {
}
