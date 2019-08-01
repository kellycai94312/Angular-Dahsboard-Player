import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditNewsComponent} from './edit-news/edit-news.component';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxHtmlEditorModule} from '../../ngx/ngx-html-editor/ngx-html-editor.module';

@NgModule({
  declarations: [EditNewsComponent],
  entryComponents: [EditNewsComponent],
  exports: [EditNewsComponent],
  imports: [
    CommonModule,
    NgxSelectModule,
    NgxInputModule,
    NgxHtmlEditorModule
  ]
})
export class EditNewsModule {
}
