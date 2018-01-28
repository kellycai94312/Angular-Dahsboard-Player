import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {GroupsPageComponent} from './groups-page/groups-page.component';
import {GroupPageComponent} from './group-page/group-page.component';
import {GroupPageRoutingModule} from './group-page-routing.module';
import {LayoutService} from '../../layout/shared/layout.service';
import {AllGroupsComponent} from './groups-page/all-groups/all-groups.component';
import {MyGroupsComponent} from './groups-page/my-groups/my-groups.component';
import {DxButtonModule, DxSelectBoxModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {NewGroupPageComponent} from './new-group-page/new-group-page.component';
import {GroupItemComponent} from './group-item/group-item.component';
import {InfiniteListModule} from '../../components/infinite-list/infinite-list.module';
import {GroupPersonComponent} from './group-person/group-person.component';
import {GroupPersonsComponent} from './group-persons/group-persons.component';
import {GroupAdministrationComponent} from './group-administration/group-administration.component';
import {GroupSettingsComponent} from './group-administration/group-settings/group-settings.component';
import {TabModule} from '../../components/tab/tab.module';
import {InputSelectModule} from '../../components/input-select/input-select.module';
import {GroupService} from './group.service';
import {SubgroupsComponent} from './group-administration/subgroups/subgroups.component';
import {SubgroupComponent} from './group-administration/subgroups/subgroup/subgroup.component';
import {MembersComponent} from './group-administration/members/members.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GroupPersonModalComponent} from './group-person-modal/group-person-modal.component';

@NgModule({
  imports: [
    CommonModule,
    GroupPageRoutingModule,
    TranslateModule.forChild(),
    DxButtonModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    InfiniteListModule,
    TabModule,
    InputSelectModule,
    NgbModule
  ],
  exports: [
    GroupItemComponent
  ],
  providers: [
    LayoutService,
    GroupService
  ],
  declarations: [
    GroupsPageComponent,
    GroupPageComponent,
    AllGroupsComponent,
    MyGroupsComponent,
    NewGroupPageComponent,
    GroupItemComponent,
    GroupPersonComponent,
    GroupPersonsComponent,
    GroupAdministrationComponent,
    GroupSettingsComponent,
    SubgroupsComponent,
    SubgroupComponent,
    MembersComponent,
    GroupPersonModalComponent
    SubgroupComponent
    GroupSettingsComponent
  ],
  entryComponents: [
    GroupItemComponent
  ]
})
export class GroupPageModule {
}
