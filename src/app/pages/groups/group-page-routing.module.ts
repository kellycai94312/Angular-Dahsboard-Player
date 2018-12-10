import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  // {
  //   path: '', component: GroupsPageComponent,
  //   children: [
  //     {path: '', redirectTo: 'my', pathMatch: 'full'},
  //     {path: 'my', component: MyGroupsComponent},
  //     {path: 'all', component: AllGroupsComponent}
  //   ]
  // },
  {
    // path: ':id', component: GroupPageComponent,
    // children: [
    //   {path: '', redirectTo: 'news', pathMatch: 'full'},
    //   {path: 'news', component: GroupNewsComponent},
    //   {path: 'member', component: GroupMembersComponent}
    // ]
  }
];

// @deprecated Use GroupPage in pages/group-page
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupPageRoutingModule {
}
