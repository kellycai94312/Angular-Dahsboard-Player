import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxHtmlEditorComponent} from './ngx-html-editor/ngx-html-editor.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [NgxHtmlEditorComponent],
  exports: [NgxHtmlEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule
  ]
})
export class NgxHtmlEditorModule {
}
