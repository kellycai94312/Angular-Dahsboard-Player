import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupPageComponent} from './group-page/group-page.component';

const routes: Routes = [
  {
    path: '', component: GroupPageComponent,
    children: [
      {path: '', redirectTo: 'news', pathMatch: 'full'},
      {path: 'news', loadChildren: './page/group-news-page/group-news-page.module#GroupNewsPageModule'},
      {path: 'member', loadChildren: './page/group-members-page/group-members-page.module#GroupMembersPageModule'},
      {path: 'request', loadChildren: './page/group-person-requests-page/group-person-requests-page.module#GroupPersonRequestsPageModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupPageRoutingModule {
}

