import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SportTypesComponent} from './sport-types/sport-types.component';

const routes: Routes = [{path: '', component: SportTypesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportTypesRoutingModule {
}
