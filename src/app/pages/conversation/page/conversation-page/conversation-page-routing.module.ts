import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConversationPageComponent} from './conversation-page/conversation-page.component';

const routes: Routes = [{path: '', component: ConversationPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversationPageRoutingModule {
}
