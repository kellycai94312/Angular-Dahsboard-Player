import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupMembersPageComponent} from './group-members-page/group-members-page.component';

const routes: Routes = [
  {path: '', component: GroupMembersPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupMembersPageRoutingModule {
}
