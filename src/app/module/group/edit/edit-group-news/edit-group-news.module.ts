import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditGroupNewsComponent} from './edit-group-news/edit-group-news.component';
import {MatCardModule, MatChipsModule, MatIconModule} from '@angular/material';
import {NgxInputModule} from '../../../ngx/ngx-input/ngx-input.module';
import {NgxHtmlEditorModule} from '../../../ngx/ngx-html-editor/ngx-html-editor.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [EditGroupNewsComponent],
  entryComponents: [EditGroupNewsComponent],
  exports: [EditGroupNewsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    NgxInputModule,
    NgxHtmlEditorModule
  ]
})
export class EditGroupNewsModule {
}
