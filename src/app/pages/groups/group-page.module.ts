import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
// import {GroupsPageComponent} from '../group/groups-page/groups-page/groups-page.component';
import {LayoutService} from '../../layout/shared/layout.service';
// import {AllGroupsComponent} from '../group/groups-page/page/all-groups/all-groups-page/all-groups.component';
// import {MyGroupsComponent} from '../group/groups-page/page/my-groups/my-groups-page/my-groups.component';
import {DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTemplateModule, DxTextAreaModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {GroupPersonsComponent} from './group-persons/group-persons.component';
import {GroupAdministrationComponent} from './group-administration/group-administration.component';
import {GroupSettingsComponent} from './group-administration/group-settings/group-settings.component';
import {InputSelectModule} from '../../components/input-select/input-select.module';
import {SubgroupsComponent} from './group-administration/subgroups/subgroups.component';
import {SubgroupComponent} from './group-administration/subgroups/subgroup/subgroup.component';
import {MembersComponent} from './group-administration/members/members.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RequestsComponent} from './group-administration/requests/requests.component';
import {PersonModule} from '../../components/person/person.module';
import {MeasureTemplateComponent} from './group-administration/measure-template/measure-template.component';
import {ModalSelectPageComponent} from '../../components/modal-select-page/modal-select-page.component';
import {ModalSelectPageModule} from '../../components/modal-select-page/modal-select-page.module';
import {ExerciseMeasureItemModule} from '../../components/exercise-measure-item/exercise-measure-item.module';
import {GroupEventsComponent} from './group-events/group-events.component';
import {GroupEventModalComponent} from './group-events/group-event-modal/group-event-modal.component';
import {ImageModule} from '../../components/image/image.module';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {BusyButtonModule} from '../../components/busy-button/busy-button.module';
import {NgxModalModule} from '../../components/ngx-modal/ngx-modal.module';
import {HtmlContentModule} from '../../components/html-content/html-content.module';
import {EditGroupPersonComponent} from './component/edit-group-person/edit-group-person.component';
import {EditGroupPersonLogComponent} from './component/edit-group-person-log/edit-group-person-log.component';
import {GroupConnectionsComponent} from './group-administration/group-connections/group-connections.component';
import {TableGroupConnectionComponent} from './component/table-group-connection/table-group-connection.component';
import {EditGroupConnectionComponent} from './component/edit-group-connection/edit-group-connection.component';
import {EditDocumentComponent} from './component/edit-document/edit-document.component';
import {NgxSplitButtonModule} from '../../components/ngx-split-button/ngx-split-button.module';
import {NgxGridModule} from '../../components/ngx-grid/ngx-grid.module';
import {FileModule} from '../../components/file/file.module';
import {EditGroupPersonLogsComponent} from './component/edit-group-person-logs/edit-group-person-logs.component';
import {GroupConnectionsGraphComponent} from './group-connections-graph/group-connections-graph.component';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {NgxTabModule} from '../../components/ngx-tab/ngx-tab.module';
import {NgxButtonModule} from '../../components/ngx-button/ngx-button.module';
import {AttachFileModule} from '../../components/attach-file/attach-file.module';
import {GroupModule} from '../../components/group/group.module';
import {UrlParserModule} from '../../pipes/url-parser/url-parser.module';

// @deprecated
@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DxValidatorModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    NgxVirtualScrollModule,
    NgxTabModule,
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
    ImageModule,
    BusyButtonModule,
    NgxModalModule,
    HtmlContentModule,
    NgxSplitButtonModule,
    DxNumberBoxModule,
    NgxGridModule,
    FileModule,
    NgxGraphModule,
    NgxChartsModule,
    NgxButtonModule,
    NgxModalModule,
    AttachFileModule,
    UrlParserModule,
    GroupModule
  ],
  exports: [
    EditGroupPersonComponent
  ],
  providers: [
    LayoutService
  ],
  declarations: [
    GroupPersonsComponent,
    GroupAdministrationComponent,
    GroupSettingsComponent,
    SubgroupsComponent,
    SubgroupComponent,
    MembersComponent,
    RequestsComponent,
    MeasureTemplateComponent,
    GroupEventsComponent,
    GroupEventModalComponent,
    EditGroupPersonComponent,
    EditGroupPersonLogComponent,
    GroupConnectionsComponent,
    TableGroupConnectionComponent,
    EditGroupConnectionComponent,
    EditDocumentComponent,
    EditGroupPersonLogsComponent,
    GroupConnectionsGraphComponent
  ],
  entryComponents: [
    ModalSelectPageComponent,
    GroupEventModalComponent,
    EditGroupPersonComponent,
    EditGroupConnectionComponent,
    EditDocumentComponent,
    EditGroupPersonLogComponent,
    EditGroupPersonLogsComponent,
    GroupAdministrationComponent
  ]
})
export class GroupPageModule {
}
