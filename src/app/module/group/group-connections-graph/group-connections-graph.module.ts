import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupConnectionsGraphComponent} from './group-connections-graph/group-connections-graph.component';
import {NgxGraphModule} from '../../ngx/ngx-graph/ngx-graph.module';

@NgModule({
  declarations: [GroupConnectionsGraphComponent],
  exports: [GroupConnectionsGraphComponent],
  imports: [
    CommonModule,
    NgxGraphModule
  ]
})
export class GroupConnectionsGraphModule {
}
