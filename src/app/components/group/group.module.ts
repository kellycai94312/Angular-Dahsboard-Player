import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupTransitionComponent} from './group-transition/group-transition.component';
import {TranslateModule} from '@ngx-translate/core';
import {AttachFileModule} from '../attach-file/attach-file.module';
import {NgxGridModule} from '../ngx-grid/ngx-grid.module';
import {DxCheckBoxModule, DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTextAreaModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {InputSelectModule} from '../input-select/input-select.module';
import {EditGroupComponent} from './edit-group/edit-group.component';
import {EditGroupNewsComponent} from './edit-group-news/edit-group-news.component';
import {GroupNewsItemComponent} from './group-news-item/group-news-item.component';
import {NgxButtonModule} from '../ngx-button/ngx-button.module';
import {UrlParserModule} from '../../pipes/url-parser/url-parser.module';
import {RouterModule} from '@angular/router';
import {GroupItemComponent} from './group-item/group-item.component';
import {ImageModule} from '../image/image.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    AttachFileModule,
    NgxGridModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxDateBoxModule,
    DxCheckBoxModule,
    DxNumberBoxModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    InputSelectModule,
    NgxButtonModule,
    UrlParserModule,
    RouterModule.forChild([]),
    ImageModule
  ],
  declarations: [
    GroupTransitionComponent,
    EditGroupComponent,
    EditGroupNewsComponent,
    GroupNewsItemComponent,
    GroupItemComponent
  ],
  entryComponents: [
    GroupTransitionComponent,
    EditGroupComponent,
    EditGroupNewsComponent,
    GroupItemComponent
  ],
  exports: [
    GroupTransitionComponent,
    EditGroupComponent,
    EditGroupNewsComponent,
    GroupNewsItemComponent,
    GroupItemComponent
  ]
})
export class GroupModule {
}
