import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualGroupClaimComponent } from 'app/pages/group/group-page/group-settings/group-email/individual-group-claim/individual-group-claim/individual-group-claim.component';

const routes: Routes = [{path: '', component: IndividualGroupClaimComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualGroupClaimRoutingModule {
}
