import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: '', redirectTo: 'group-news', pathMatch: 'full'},
      {path: 'group-news', loadChildren: './group-news/group-news.module#GroupNewsModule'},
      {path: 'person-news', loadChildren: './person-news/person-news.module#PersonNewsModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
