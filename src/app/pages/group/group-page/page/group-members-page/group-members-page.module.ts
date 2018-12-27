import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgxGridModule} from '../../../../../components/ngx-grid/ngx-grid.module';
import {NgxSplitButtonModule} from '../../../../../components/ngx-split-button/ngx-split-button.module';
import {GroupMembersPageComponent} from './group-members-page/group-members-page.component';
import {GroupMembersPageRoutingModule} from './group-members-page-routing.module';
import {EditPersonModule} from '../../../../../module/person/edit-person/edit-person.module';

@NgModule({
  imports: [
    CommonModule,
    GroupMembersPageRoutingModule,
    TranslateModule.forChild(),
    NgxGridModule,
    NgxSplitButtonModule,
    EditPersonModule
  ],
  declarations: [GroupMembersPageComponent]
})
export class GroupMembersPageModule {
}
