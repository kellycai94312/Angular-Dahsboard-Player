import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupPersonRequestComponent } from 'app/pages/sign-up/group-person-request/group-person-request/group-person-request.component';

const routes: Routes = [{path: '', component: GroupPersonRequestComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupPersonRequestRoutingModule {
}
