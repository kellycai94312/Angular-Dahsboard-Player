import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonPageComponent} from './person-page/person-page.component';

const routes: Routes = [
  {
    path: '', component: PersonPageComponent,
    children: [
      {path: '', redirectTo: 'personal', pathMatch: 'full'},
      {path: 'personal', loadChildren: './page/personal-page/personal-page.module#PersonalPageModule'},
      {path: 'contact', loadChildren: './page/contact-page/contact-page.module#ContactPageModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonPageRoutingModule {
}
