import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { NgxImageModule } from 'app/components/ngx-image';
import { ConversationItemComponent } from './conversation-item/conversation-item.component';

@NgModule({
  declarations: [ConversationItemComponent],
  entryComponents: [ConversationItemComponent],
  exports: [ConversationItemComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    NgxImageModule
  ]
})
export class ConversationItemModule {
}
