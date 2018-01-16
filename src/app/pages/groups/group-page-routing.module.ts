import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GroupsPageComponent} from './groups-page/groups-page.component';
import {GroupPageComponent} from './group-page/group-page.component';
import {AllGroupsComponent} from './groups-page/all-groups/all-groups.component';
import {MyGroupsComponent} from './groups-page/my-groups/my-groups.component';

const routes: Routes = [
  {
    path: '', component: GroupsPageComponent,
    children: [
      {path: '', redirectTo: 'all'},
      {path: 'all', component: AllGroupsComponent},
      {path: 'my', component: MyGroupsComponent}
    ]
  },
  {
    path: ':id', component: GroupPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupPageRoutingModule {
}
