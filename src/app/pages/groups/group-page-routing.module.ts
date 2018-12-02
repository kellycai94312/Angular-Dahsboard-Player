import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GroupsPageComponent} from './groups-page/groups-page.component';
import {GroupPageComponent} from './group-page/group-page.component';
import {AllGroupsComponent} from './groups-page/all-groups/all-groups.component';
import {MyGroupsComponent} from './groups-page/my-groups/my-groups.component';
import {GroupMembersComponent} from './component/group-members/group-members.component';
import {GroupNewsComponent} from './component/group-news/group-news.component';

const routes: Routes = [
  {
    path: '', component: GroupsPageComponent,
    children: [
      {path: '', redirectTo: 'my', pathMatch: 'full'},
      {path: 'my', component: MyGroupsComponent},
      {path: 'all', component: AllGroupsComponent}
    ]
  },
  {
    path: ':id', component: GroupPageComponent,
    children: [
      {path: '', redirectTo: 'member', pathMatch: 'full'},
      {path: 'member', component: GroupMembersComponent},
      {path: 'news', component: GroupNewsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupPageRoutingModule {
}
