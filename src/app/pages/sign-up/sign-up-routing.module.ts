import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GeneralSignUpComponent} from './step/general-sign-up/general-sign-up.component';


const routes: Routes = [{path: '', component: GeneralSignUpComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule {
}
