import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubgroupTemplateGraphComponent} from './subgroup-template-graph/subgroup-template-graph.component';
import {DxSelectBoxModule} from 'devextreme-angular';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {TooltipModule} from '@swimlane/ngx-charts';

@NgModule({
  declarations: [SubgroupTemplateGraphComponent],
  exports: [SubgroupTemplateGraphComponent],
  imports: [
    CommonModule,
    DxSelectBoxModule,
    NgxGraphModule,
    TooltipModule
  ]
})
export class SubgroupTemplateGraphModule {
}
