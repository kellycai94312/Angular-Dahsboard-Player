import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupPageComponent} from './group-page/group-page.component';

const routes: Routes = [
  {
    path: '', component: GroupPageComponent,
    children: [
      {path: '', redirectTo: 'news', pathMatch: 'full'},
      {path: 'news', loadChildren: './page/group-news-page/group-news-page.module#GroupNewsPageModule'},
      {path: 'employee', loadChildren: './page/group-employees-page/group-employees-page.module#GroupEmployeesPageModule'},
      {path: 'subscriber', loadChildren: './page/group-subscribers-page/group-subscribers-page.module#GroupSubscribersPageModule'},
      {path: 'subgroup', loadChildren: './page/subgroups-page/subgroups-page.module#SubgroupsPageModule'},
      // {path: 'member', loadChildren: './page/group-members-page/group-members-page.module#GroupMembersPageModule'},
      {path: 'request', loadChildren: './page/group-person-requests-page/group-person-requests-page.module#GroupPersonRequestsPageModule'},
      {path: 'structure', loadChildren: './page/group-structure/group-structure.module#GroupStructureModule'},
      {path: 'schedule', loadChildren: './page/group-schedule/group-schedule.module#GroupScheduleModule'}
    ]
  },
  {path: 'settings', loadChildren: './group-settings/group-settings.module#GroupSettingsModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupPageRoutingModule {
}

