import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllGroupsPageComponent} from './all-groups-page/all-groups-page.component';

const routes: Routes = [
  {path: '', component: AllGroupsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllGroupsPageRoutingModule {
}
