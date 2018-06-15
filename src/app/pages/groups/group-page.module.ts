import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {GroupsPageComponent} from './groups-page/groups-page.component';
import {GroupPageComponent} from './group-page/group-page.component';
import {GroupPageRoutingModule} from './group-page-routing.module';
import {LayoutService} from '../../layout/shared/layout.service';
import {AllGroupsComponent} from './groups-page/all-groups/all-groups.component';
import {MyGroupsComponent} from './groups-page/my-groups/my-groups.component';
import {DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxSelectBoxModule, DxTemplateModule, DxTextAreaModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {NewGroupPageComponent} from './new-group-page/new-group-page.component';
import {InfiniteListModule} from '../../components/infinite-list/infinite-list.module';
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
import {RequestsComponent} from './group-administration/requests/requests.component';
import {PersonModule} from '../../components/person/person.module';
import {MeasureTemplateComponent} from './group-administration/measure-template/measure-template.component';
import {ModalSelectPageComponent} from '../../components/modal-select-page/modal-select-page.component';
import {ModalSelectPageModule} from '../../components/modal-select-page/modal-select-page.module';
import {ExerciseMeasureItemModule} from '../../components/exercise-measure-item/exercise-measure-item.module';
import {GroupEventsComponent} from './group-events/group-events.component';
import {GroupEventModalComponent} from './group-events/group-event-modal/group-event-modal.component';
import {GroupComponent} from './group/group.component';
import {ImageModule} from '../../components/image/image.module';

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
    NgbModule,
    PersonModule,
    DxCheckBoxModule,
    DxDataGridModule,
    DxTemplateModule,
    ModalSelectPageModule,
    ExerciseMeasureItemModule,
    DxDateBoxModule,
    DxTextAreaModule,
    ImageModule
  ],
  exports: [
    GroupComponent
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
    GroupPersonsComponent,
    GroupAdministrationComponent,
    GroupSettingsComponent,
    SubgroupsComponent,
    SubgroupComponent,
    MembersComponent,
    RequestsComponent,
    GroupPersonModalComponent,
    MeasureTemplateComponent,
    GroupEventsComponent,
    GroupEventModalComponent,
    GroupComponent
  ],
  entryComponents: [
    GroupComponent,
    GroupPersonModalComponent,
    ModalSelectPageComponent,
    GroupEventModalComponent
  ]
})
export class GroupPageModule {
}
