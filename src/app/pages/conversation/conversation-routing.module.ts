import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConversationsPageComponent} from './conversations-page/conversations-page.component';
import {ConversationPageComponent} from './conversation-page/conversation-page.component';

const routes: Routes = [
  {path: '', component: ConversationsPageComponent},
  {path: ':id', component: ConversationPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversationRoutingModule {
}
