import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConnectionsPageComponent} from './connections-page/connections-page.component';
import {ConnectionRoutingModule} from './connection-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ConnectionRoutingModule
  ],
  declarations: [ConnectionsPageComponent]
})
export class ConnectionModule {
}
