import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StructureSubgroupsPageComponent} from './structure-subgroups-page/structure-subgroups-page.component';

const routes: Routes = [
  {path: '', component: StructureSubgroupsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructureSubgroupsPageRoutingModule {
}
