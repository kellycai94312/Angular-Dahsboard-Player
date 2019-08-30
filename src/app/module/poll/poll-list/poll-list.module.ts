import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PollListComponent} from './poll-list/poll-list.component';
import {ItemListModule} from '../../common/item-list/item-list.module';
import {PollItemModule} from '../poll-item/poll-item.module';
import {EditPollModule} from '../edit-poll/edit-poll.module';
import {PollWindowService} from '../../../services/windows/poll-window/poll-window.service';

@NgModule({
  declarations: [PollListComponent],
  providers: [PollWindowService],
  exports: [PollListComponent],
  imports: [
    CommonModule,
    ItemListModule,
    PollItemModule,
    EditPollModule
  ]
})
export class PollListModule {
}
