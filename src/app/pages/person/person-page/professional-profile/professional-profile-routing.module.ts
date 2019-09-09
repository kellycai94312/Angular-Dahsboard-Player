import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfessionalProfileComponent} from './professional-profile/professional-profile.component';

const routes: Routes = [{path: '', component: ProfessionalProfileComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionalProfileRoutingModule {
}
