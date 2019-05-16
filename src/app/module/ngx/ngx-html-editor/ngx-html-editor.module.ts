import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxHtmlEditorComponent} from './ngx-html-editor/ngx-html-editor.component';
import {FormsModule} from '@angular/forms';
import {CKEditorModule} from 'ngx-ckeditor';

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
