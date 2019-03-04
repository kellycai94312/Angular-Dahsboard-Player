import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TemplatesSubgroupsPageComponent} from './templates-subgroups-page/templates-subgroups-page.component';

const routes: Routes = [
  {path: '', component: TemplatesSubgroupsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesSubgroupsPageRoutingModule {
}
