import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonPublicationsComponent} from './person-publications/person-publications.component';

const routes: Routes = [{path: '', component: PersonPublicationsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonPublicationsRoutingModule {
}
