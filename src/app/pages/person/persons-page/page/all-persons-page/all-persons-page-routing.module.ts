import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllPersonsPageComponent} from './all-persons-page/all-persons-page.component';

const routes: Routes = [
  {path: '', component: AllPersonsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllPersonsPageRoutingModule {
}
