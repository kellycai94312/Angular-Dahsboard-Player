import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApplicationsRoutingModule} from './applications-routing.module';
import {ApplicationsComponent} from './applications/applications.component';
import {ApplicationListModule} from '../../../module/application/application-list/application-list.module';

@NgModule({
  declarations: [ApplicationsComponent],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    ApplicationListModule
  ]
})
export class ApplicationsModule {
}
