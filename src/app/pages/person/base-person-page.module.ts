import {NgModule} from '@angular/core';
import {BasePersonPageComponent} from './base-person-page/base-person-page.component';
import {BasePersonPageRoutingModule} from './base-person-page-routing.module';

@NgModule({
  imports: [BasePersonPageRoutingModule],
  declarations: [BasePersonPageComponent]
})
export class BasePersonPageModule {
}
