import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationItemComponent} from './conversation-item/conversation-item.component';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    NgxImageModule
  ],
  declarations: [ConversationItemComponent],
  exports: [ConversationItemComponent]
})
export class ConversationItemModule {
}
