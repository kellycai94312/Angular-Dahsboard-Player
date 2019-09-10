import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PollMessageContentItemComponent} from './poll-message-content-item/poll-message-content-item.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [PollMessageContentItemComponent],
  exports: [PollMessageContentItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ]
})
export class PollMessageContentItemModule {
}
