import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonPageComponent } from './person-page/person-page.component';

const routes: Routes = [
  {
    path: '', component: PersonPageComponent,
    children: [
      {path: '', redirectTo: 'publication', pathMatch: 'full'},
      {path: 'publication', loadChildren: './person-publications/person-publications.module#PersonPublicationsModule'},
      {path: 'about-me', loadChildren: './about-me/about-me.module#AboutMeModule'},
      {path: 'professional-profile', loadChildren: './professional-profile/professional-profile.module#ProfessionalProfileModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonPageRoutingModule {
}
