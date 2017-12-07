import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationPageComponent } from './registration-page.component';
import { RegistrationPersonPageComponent } from './registration-person-page/registration-person-page.component';

const routes: Routes = [
  {path: '', component: RegistrationPageComponent},
  {path: 'person', component: RegistrationPersonPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationPageRoutingModule {
}
