import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConnectionsPageComponent} from './connections-page/connections-page.component';

const routes: Routes = [
  {path: '', component: ConnectionsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionRoutingModule {
}
