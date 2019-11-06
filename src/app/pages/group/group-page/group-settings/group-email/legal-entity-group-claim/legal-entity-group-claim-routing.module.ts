import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegalEntityGroupClaimComponent } from 'app/pages/group/group-page/group-settings/group-email/legal-entity-group-claim/legal-entity-group-claim/legal-entity-group-claim.component';

const routes: Routes = [{path: '', component: LegalEntityGroupClaimComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalEntityGroupClaimRoutingModule {
}
