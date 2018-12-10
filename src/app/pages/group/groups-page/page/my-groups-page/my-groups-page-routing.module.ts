import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyGroupsPageComponent} from './my-groups-page/my-groups-page.component';

const routes: Routes = [
  {path: '', component: MyGroupsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyGroupsPageRoutingModule {
}
