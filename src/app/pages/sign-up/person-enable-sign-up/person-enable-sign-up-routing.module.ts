import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonEnableSignUpComponent} from './person-enable-sign-up/person-enable-sign-up.component';

const routes: Routes = [{path: '', component: PersonEnableSignUpComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonEnableSignUpRoutingModule {
}
