import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupPersonRequestsPageComponent} from './group-person-requests-page/group-person-requests-page.component';

const routes: Routes = [
  {path: '', component: GroupPersonRequestsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupPersonRequestsPageRoutingModule {
}
