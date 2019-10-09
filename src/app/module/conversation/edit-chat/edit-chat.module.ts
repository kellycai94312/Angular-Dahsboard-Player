import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { NgxImageModule } from 'app/components/ngx-image/ngx-image.module';
import { NgxSelectionModule } from 'app/components/ngx-selection/ngx-selection.module';
import { NgxInputModule } from 'app/module/ngx/ngx-input/ngx-input.module';
import { EditChatComponent } from './edit-chat/edit-chat.component';

@NgModule({
  declarations: [EditChatComponent],
  entryComponents: [EditChatComponent],
  exports: [EditChatComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    NgxSelectionModule,
    NgxInputModule,
    NgxImageModule
  ]
})
export class EditChatModule {
}
