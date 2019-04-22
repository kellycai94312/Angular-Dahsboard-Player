import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphComponent} from './graph/graph.component';
import {NgxGraphModule} from '@swimlane/ngx-graph';

@NgModule({
  declarations: [GraphComponent],
  exports: [GraphComponent],
  imports: [
    CommonModule,
    NgxGraphModule
  ]
})
export class GraphModule {
}
