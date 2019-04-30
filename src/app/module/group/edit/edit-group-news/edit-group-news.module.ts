import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditGroupNewsComponent} from './edit-group-news/edit-group-news.component';
import {MatCardModule} from '@angular/material';
import {NgxInputModule} from '../../../ngx/ngx-input/ngx-input.module';
import {NgxHtmlEditorModule} from '../../../ngx/ngx-html-editor/ngx-html-editor.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [EditGroupNewsComponent],
  entryComponents: [EditGroupNewsComponent],
  exports: [EditGroupNewsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    NgxInputModule,
    NgxHtmlEditorModule
  ]
})
export class EditGroupNewsModule {
}
