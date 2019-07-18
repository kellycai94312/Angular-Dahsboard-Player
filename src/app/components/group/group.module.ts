import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupTransitionComponent} from './group-transition/group-transition.component';
import {TranslateModule} from '@ngx-translate/core';
import {AttachFileModule} from '../attach-file/attach-file.module';
import {NgxGridModule} from '../ngx-grid/ngx-grid.module';
import {InputSelectModule} from '../input-select/input-select.module';
import {GroupNewsItemComponent} from './group-news-item/group-news-item.component';
import {NgxButtonModule} from '../ngx-button/ngx-button.module';
import {UrlParserModule} from '../../pipes/url-parser/url-parser.module';
import {RouterModule} from '@angular/router';
import {EditGroupModule} from '../../module/group/edit-group/edit-group.module';
import {EditGroupComponent} from '../../module/group/edit-group/edit-group/edit-group.component';
import {MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatMenuModule} from '@angular/material';
import {EditGroupNewsModule} from '../../module/group/edit/edit-group-news/edit-group-news.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxInputModule} from '../../module/ngx/ngx-input/ngx-input.module';
import {NgxDateModule} from '../../module/ngx/ngx-date/ngx-date.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    AttachFileModule,
    NgxGridModule,
    InputSelectModule,
    NgxButtonModule,
    UrlParserModule,
    RouterModule.forChild([]),
    EditGroupModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    FlexLayoutModule,
    // TODO: Remove this import
    EditGroupNewsModule,
    NgxInputModule,
    NgxDateModule
  ],
  declarations: [
    GroupTransitionComponent,
    GroupNewsItemComponent
  ],
  entryComponents: [
    GroupTransitionComponent
  ],
  exports: [
    GroupTransitionComponent,
    GroupNewsItemComponent,
    EditGroupComponent
  ]
})
export class GroupModule {
}
