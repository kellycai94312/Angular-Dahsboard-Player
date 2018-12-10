import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupsPageComponent} from './groups-page/groups-page.component';

const routes: Routes = [
  {
    path: '', component: GroupsPageComponent,
    children: [
      {path: '', redirectTo: 'my', pathMatch: 'full'},
      {path: 'my', loadChildren: './page/my-groups-page/my-groups-page.module#MyGroupsPageModule'},
      {path: 'all', loadChildren: './page/all-groups-page/all-groups-page.module#AllGroupsPageModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsPageRoutingModule {
}
