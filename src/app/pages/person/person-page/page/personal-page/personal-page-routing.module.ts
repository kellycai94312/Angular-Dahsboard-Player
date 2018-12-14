import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonalPageComponent} from './personal-page/personal-page.component';

const routes: Routes = [
  {path: '', component: PersonalPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalPageRoutingModule {
}
