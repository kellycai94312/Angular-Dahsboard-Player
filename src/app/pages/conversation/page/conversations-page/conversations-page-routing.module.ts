import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConversationsPageComponent} from './conversations-page/conversations-page.component';

const routes: Routes = [{path: '', component: ConversationsPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversationsPageRoutingModule {
}
