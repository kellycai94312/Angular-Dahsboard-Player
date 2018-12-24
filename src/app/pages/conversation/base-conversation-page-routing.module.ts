import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaseConversationPageComponent} from './base-conversation-page/base-conversation-page.component';

const routes: Routes = [
  {
    path: '', component: BaseConversationPageComponent,
    children: [
      {path: '', loadChildren: './page/conversations-page/conversations-page.module#ConversationsPageModule'},
      {path: ':id', loadChildren: './page/conversation-page/conversation-page.module#ConversationPageModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseConversationPageRoutingModule {
}
