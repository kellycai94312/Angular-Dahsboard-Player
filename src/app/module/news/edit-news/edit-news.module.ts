import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditNewsComponent} from './edit-news/edit-news.component';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxHtmlEditorModule} from '../../ngx/ngx-html-editor/ngx-html-editor.module';
import {MatButtonModule, MatChipsModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ModalBuilderService} from '../../../service/modal-builder/modal-builder.service';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [EditNewsComponent],
  providers: [ModalBuilderService],
  entryComponents: [EditNewsComponent],
  exports: [EditNewsComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxSelectModule,
    NgxInputModule,
    NgxHtmlEditorModule,
  ]
})
export class EditNewsModule {
}
