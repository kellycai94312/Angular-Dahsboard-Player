import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxGraphComponent} from './ngx-graph/ngx-graph.component';
import {NgxGraphModule as SwimlaneNgxGraphModule} from '@swimlane/ngx-graph';

@NgModule({
  declarations: [NgxGraphComponent],
  exports: [NgxGraphComponent],
  imports: [
    CommonModule,
    SwimlaneNgxGraphModule
  ]
})
export class NgxGraphModule {
}
