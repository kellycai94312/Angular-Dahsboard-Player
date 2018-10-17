import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {PersonPageRoutingModule} from './person-page-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {PersonPageComponent} from './person-page/person-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxFormModule,
  DxNumberBoxModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxValidatorModule
} from 'devextreme-angular';
import {TranslateModule} from '@ngx-translate/core';
import {DxiValidationRuleModule} from 'devextreme-angular/ui/nested/validation-rule-dxi';
import {FormsModule} from '@angular/forms';
import {PersonsPageComponent} from './persons-page/persons-page.component';
import {InvokeDirective} from '../../directives/invoke.directive';
import {AnthropometryComponent} from './person-page/anthropometry/anthropometry.component';
import {PersonalComponent} from './person-page/personal/personal.component';
import {ContactComponent} from './person-page/contact/contact.component';
import {TestsResultsComponent} from './person-page/tests-results/tests-results.component';
import {EventsComponent} from './person-page/events/events.component';
import {PersonService} from './person-page/person.service';
import {InputSelectModule} from '../../components/input-select/input-select.module';
import {GroupsComponent} from './person-page/groups/groups.component';
import {GroupPageModule} from '../groups/group-page.module';
import {GroupPersonComponent} from './person-page/group-person/group-person.component';
import {PersonModule} from '../../components/person/person.module';
import {ModalSelectPageComponent} from '../../components/modal-select-page/modal-select-page.component';
import {ModalSelectPageModule} from '../../components/modal-select-page/modal-select-page.module';
import {ExerciseMeasureItemModule} from '../../components/exercise-measure-item/exercise-measure-item.module';
import {EventModalComponent} from './person-page/events/event-modal/event-modal.component';
import {MyRegionComponent} from './person-page/my-region/my-region.component';
import {SchoolNoteComponent} from './person-page/my-region/school-note/school-note.component';
import {TrainerNoteComponent} from './person-page/my-region/trainer-note/trainer-note.component';
import {AgentNoteComponent} from './person-page/my-region/agent-note/agent-note.component';
import {MyRegionService} from './person-page/my-region/my-region.service';
import {AchievementsComponent} from './person-page/achievements/achievements.component';
import {RanksComponent} from './person-page/ranks/ranks.component';
import {MeasureInputModule} from '../../components/measure-input/measure-input.module';
import {AnthropometryHistoryComponent} from './person-page/anthropometry-history/anthropometry-history.component';
import {TestsResultsHistoryComponent} from './person-page/tests-results-history/tests-results-history.component';
import {MeasureHistoryModule} from '../../components/measure-history/measure-history.module';
import {RoundPipe} from '../../pipes/round.pipe';
import {BusyButtonModule} from '../../components/busy-button/busy-button.module';
import {ImageModule} from '../../components/image/image.module';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {RefereeCategoriesComponent} from './person-page/category/referee-categories/referee-categories.component';
import {CanDeactivateGuard} from '../../guard/can-deactivate.guard';
import {MyGroupsComponent} from './person-page/my-groups/my-groups.component';
import {NamedObjectItemModule} from '../../components/named-object-item/named-object-item.module';
import {RequisitesComponent} from './person-page/requisites/requisites.component';
import {NgxSplitButtonModule} from '../../components/ngx-split-button/ngx-split-button.module';
import {ContactEnableModalComponent} from './person-page/contact/contact-enable-modal/contact-enable-modal.component';
import {NgxButtonGroupModule} from '../../components/ngx-button-group/ngx-button-group.module';
import {GroupPersonLogsComponent} from './component/group-person-logs/group-person-logs.component';
import {PersonStagesComponent} from './person-page/person-stages/person-stages.component';
import {EditPersonStageComponent} from './component/edit-person-stage/edit-person-stage.component';
import {MedicalExaminationsComponent} from './person-page/medical-examinations/medical-examinations.component';
import {EditMedicalExaminationComponent} from './component/edit-medical-examination/edit-medical-examination.component';
import {EditPersonComponent} from './component/edit-person/edit-person.component';
import {NgxGridModule} from '../../components/ngx-grid/ngx-grid.module';
import {EditRankComponent} from './component/edit-rank/edit-rank.component';
import {PersonStageStandardsComponent} from './person-page/person-stage-standards/person-stage-standards.component';
import {ReportModule} from '../../components/report/report.module';
import {EditRefereeCategoryComponent} from './component/edit-referee-category/edit-referee-category.component';
import {EditNoteComponent} from './component/edit-note/edit-note.component';
import {NgxTabModule} from '../../components/ngx-tab/ngx-tab.module';
import {NgxButtonModule} from '../../components/ngx-button/ngx-button.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PersonPageRoutingModule,
    TranslateModule.forChild(),
    NgbModule.forRoot(),
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxiValidationRuleModule,
    DxPopupModule,
    DxTemplateModule,
    FormsModule,
    InputSelectModule,
    ModalSelectPageModule,
    GroupPageModule,
    PersonModule,
    DxDataGridModule,
    DxButtonModule,
    ExerciseMeasureItemModule,
    DxCheckBoxModule,
    MeasureInputModule,
    MeasureHistoryModule,
    BusyButtonModule,
    ImageModule,
    NgxVirtualScrollModule,
    NamedObjectItemModule,
    NgxSplitButtonModule,
    NgxButtonGroupModule,
    DxNumberBoxModule,
    NgxGridModule,
    ReportModule,
    NgxTabModule,
    NgxButtonModule
  ],
  declarations: [
    PersonPageComponent,
    PersonsPageComponent,
    InvokeDirective,
    AnthropometryComponent,
    AchievementsComponent,
    PersonalComponent,
    ContactComponent,
    TestsResultsComponent,
    EventsComponent,
    GroupsComponent,
    GroupPersonComponent,
    EventModalComponent,
    MyRegionComponent,
    SchoolNoteComponent,
    TrainerNoteComponent,
    AgentNoteComponent,
    RanksComponent,
    TestsResultsHistoryComponent,
    AnthropometryHistoryComponent,
    RefereeCategoriesComponent,
    MyGroupsComponent,
    RequisitesComponent,
    ContactEnableModalComponent,
    GroupPersonLogsComponent,
    PersonStagesComponent,
    EditPersonStageComponent,
    MedicalExaminationsComponent,
    EditMedicalExaminationComponent,
    EditPersonComponent,
    EditRankComponent,
    PersonStageStandardsComponent,
    EditRefereeCategoryComponent,
    EditNoteComponent
  ],
  providers: [
    PersonService,
    MyRegionService,
    DatePipe,
    RoundPipe,
    CanDeactivateGuard
  ],
  entryComponents: [
    ModalSelectPageComponent,
    EventModalComponent,
    ContactEnableModalComponent,
    EditPersonStageComponent,
    EditMedicalExaminationComponent,
    EditPersonComponent,
    EditRankComponent,
    RanksComponent,
    EditRefereeCategoryComponent,
    EditNoteComponent
  ]
})
export class PersonPageModule {
}
