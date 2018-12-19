import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyPersonsPageComponent} from './my-persons-page/my-persons-page.component';

const routes: Routes = [
  {path: '', component: MyPersonsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPersonsPageRoutingModule {
}
