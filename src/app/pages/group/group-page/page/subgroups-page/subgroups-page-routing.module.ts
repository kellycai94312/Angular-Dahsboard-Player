import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubgroupsPageComponent} from './subgroups-page/subgroups-page.component';

const routes: Routes = [
  {
    path: '', component: SubgroupsPageComponent,
    children: [
      {path: '', redirectTo: 'structure', pathMatch: 'full'},
      {path: 'structure', loadChildren: './page/structure-subgroups-page/structure-subgroups-page.module#StructureSubgroupsPageModule'},
      {path: 'template', loadChildren: './page/templates-subgroups-page/templates-subgroups-page.module#TemplatesSubgroupsPageModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubgroupsPageRoutingModule {
}
