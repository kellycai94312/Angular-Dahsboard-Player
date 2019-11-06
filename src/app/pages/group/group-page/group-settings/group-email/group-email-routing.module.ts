import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupEmailComponent } from 'app/pages/group/group-page/group-settings/group-email/group-email/group-email.component';

const routes: Routes = [
  {
    path: '', component: GroupEmailComponent,
    children: [
      {path: '', redirectTo: 'individual-group-claim', pathMatch: 'full'},
      {
        path: 'individual-group-claim',
        loadChildren: './individual-group-claim/individual-group-claim.module#IndividualGroupClaimModule'
      },
      {
        path: 'legal-entity-group-claim',
        loadChildren: './legal-entity-group-claim/legal-entity-group-claim.module#LegalEntityGroupClaimModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupEmailRoutingModule {
}
