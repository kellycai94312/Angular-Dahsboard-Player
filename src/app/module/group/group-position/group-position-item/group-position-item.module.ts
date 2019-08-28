import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupPositionItemComponent} from './group-position-item/group-position-item.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {EditGroupPositionModule} from '../edit-group-position/edit-group-position.module';

@NgModule({
  declarations: [GroupPositionItemComponent],
  entryComponents: [GroupPositionItemComponent],
  exports: [GroupPositionItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    EditGroupPositionModule
  ]
})
export class GroupPositionItemModule {
}
