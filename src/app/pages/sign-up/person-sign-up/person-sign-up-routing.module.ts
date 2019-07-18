import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonSignUpComponent} from './person-sign-up/person-sign-up.component';

const routes: Routes = [{path: '', component: PersonSignUpComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonSignUpRoutingModule {
}
