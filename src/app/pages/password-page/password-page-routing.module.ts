import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PasswordResetPageComponent} from './password-reset-page/password-reset-page.component';

const routes: Routes = [{path: 'reset', component: PasswordResetPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordPageRoutingModule {
}
