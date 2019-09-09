import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  {
    path: '', component: SearchComponent,
    children: [
      {path: '', redirectTo: 'person', pathMatch: 'full'},
      {path: 'person', loadChildren: './persons/persons.module#PersonsModule'},
      {path: 'group', loadChildren: './groups/groups.module#GroupsModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
