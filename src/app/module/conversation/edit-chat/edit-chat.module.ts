import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditChatComponent} from './edit-chat/edit-chat.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxSelectionModule} from '../../../components/ngx-selection/ngx-selection.module';
import {NgxInputModule} from '../../../components/ngx-input/ngx-input.module';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    NgxSelectionModule,
    NgxInputModule,
    NgxImageModule
  ],
  declarations: [EditChatComponent],
  entryComponents: [EditChatComponent],
  exports: [EditChatComponent]
})
export class EditChatModule {
}
