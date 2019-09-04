import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PollsRoutingModule} from './polls-routing.module';
import {PollsComponent} from './polls/polls.component';
import {PollListModule} from '../../../module/poll/poll-list/poll-list.module';

@NgModule({
  declarations: [PollsComponent],
  imports: [
    CommonModule,
    PollsRoutingModule,
    PollListModule
  ]
})
export class PollsModule {
}
