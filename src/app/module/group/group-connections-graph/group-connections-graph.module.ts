import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupConnectionsGraphComponent} from './group-connections-graph/group-connections-graph.component';
import {GraphModule} from '../../ngx/ngx-graph/graph.module';

@NgModule({
  declarations: [GroupConnectionsGraphComponent],
  exports: [GroupConnectionsGraphComponent],
  imports: [
    CommonModule,
    GraphModule
  ]
})
export class GroupConnectionsGraphModule {
}
