import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatMenuModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EditGroupModule } from '../../module/group/edit-group/edit-group.module';
import { EditGroupComponent } from '../../module/group/edit-group/edit-group/edit-group.component';
import { NgxDateModule } from '../../module/ngx/ngx-date/ngx-date.module';
import { NgxInputModule } from '../../module/ngx/ngx-input/ngx-input.module';
import { NgxSelectModule } from '../../module/ngx/ngx-select/ngx-select.module';
import { UrlParserModule } from '../../pipes/url-parser/url-parser.module';
import { InputSelectModule } from '../input-select/input-select.module';
import { NgxButtonModule } from '../ngx-button/ngx-button.module';
import { NgxGridModule } from '../ngx-grid/ngx-grid.module';
import { GroupTransitionComponent } from './group-transition/group-transition.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
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
    NgxInputModule,
    NgxDateModule,
    NgxSelectModule
  ],
  declarations: [GroupTransitionComponent],
  entryComponents: [GroupTransitionComponent],
  exports: [
    GroupTransitionComponent,
    EditGroupComponent
  ]
})
export class GroupModule {
}
