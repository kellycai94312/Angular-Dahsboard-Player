import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PollsComponent} from './polls/polls.component';

const routes: Routes = [{path: '', component: PollsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollsRoutingModule {
}
