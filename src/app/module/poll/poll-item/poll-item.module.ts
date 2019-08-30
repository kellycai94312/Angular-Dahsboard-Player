import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PollItemComponent} from './poll-item/poll-item.component';
import {BaseLibraryItemModule} from '../../library/base-library-item/base-library-item.module';

@NgModule({
  declarations: [PollItemComponent],
  entryComponents: [PollItemComponent],
  exports: [PollItemComponent],
  imports: [
    CommonModule,
    BaseLibraryItemModule
  ]
})
export class PollItemModule {
}
