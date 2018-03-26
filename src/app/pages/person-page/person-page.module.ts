import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PersonPageRoutingModule } from './person-page-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PersonPageComponent } from './person-page/person-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTemplateModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxValidatorModule
} from 'devextreme-angular';
import { TranslateModule } from '@ngx-translate/core';
import { DxiValidationRuleModule } from 'devextreme-angular/ui/nested/validation-rule-dxi';
import { FormsModule } from '@angular/forms';
import { PersonsPageComponent } from './persons-page/persons-page.component';
import { InvokeDirective } from '../../directives/invoke.directive';
import { AnthropometryComponent } from './person-page/anthropometry/anthropometry.component';
import { PersonalComponent } from './person-page/personal/personal.component';
import { ContactComponent } from './person-page/contact/contact.component';
import { TestsResultsComponent } from './person-page/tests-results/tests-results.component';
import { EventsComponent } from './person-page/events/events.component';
import { PersonService } from './person-page/person.service';
import { ModalModule } from 'ngx-bootstrap';
import { InputSelectModule } from '../../components/input-select/input-select.module';
import { InfiniteListModule } from '../../components/infinite-list/infinite-list.module';
import { GroupsComponent } from './person-page/groups/groups.component';
import { GroupPageModule } from '../groups/group-page.module';
import { GroupPersonComponent } from './person-page/group-person/group-person.component';
import { PersonModule } from '../../components/person/person.module';
import { MeasureHistoryComponent } from './person-page/tests-results/measure-history/measure-history.component';
import { ModalSelectPageComponent } from '../../components/modal-select-page/modal-select-page.component';
import { ModalSelectPageModule } from '../../components/modal-select-page/modal-select-page.module';
import { ExerciseMeasureItemModule } from '../../components/exercise-measure-item/exercise-measure-item.module';
import { EventModalComponent } from './person-page/events/event-modal/event-modal.component';
import { TableHistoryComponent } from './person-page/tests-results/measure-history/table-history/table-history.component';
import { ChartHistoryComponent } from './person-page/tests-results/measure-history/chart-history/chart-history.component';
import { TabModule } from '../../components/tab/tab.module';
import { MeasureHistoryService } from './person-page/tests-results/measure-history/measure-history.service';
import { MyRegionComponent } from './person-page/my-region/my-region.component';
import { SchoolNoteComponent } from './person-page/my-region/school-note/school-note.component';
import { TrainerNoteComponent } from './person-page/my-region/trainer-note/trainer-note.component';
import { AgentNoteComponent } from './person-page/my-region/agent-note/agent-note.component';
import { MyRegionService } from './person-page/my-region/my-region.service';
import { NoteModalComponent } from './person-page/my-region/note-modal/note-modal.component';
import { AchievementsComponent } from './person-page/achievements/achievements.component';
import { SportTypeItemModule } from '../../components/sport-type-item/sport-type-item.module';
import { UserRoleItemModule } from '../../components/user-role-item/user-role-item.module';
import { RanksComponent } from './person-page/ranks/ranks.component';
import { RankModalComponent } from './person-page/ranks/rank-modal/rank-modal.component';
import { MeasureInputModule } from '../../components/measure-input/measure-input.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PersonPageRoutingModule,
    TranslateModule.forChild(),
    NgbModule.forRoot(),
    ModalModule.forRoot(),
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
    InfiniteListModule,
    ModalSelectPageModule,
    GroupPageModule,
    PersonModule,
    DxDataGridModule,
    DxButtonModule,
    ExerciseMeasureItemModule,
    SportTypeItemModule,
    UserRoleItemModule,
    DxCheckBoxModule,
    TabModule,
    MeasureInputModule
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
    MeasureHistoryComponent,
    EventModalComponent,
    TableHistoryComponent,
    ChartHistoryComponent,
    MyRegionComponent,
    SchoolNoteComponent,
    TrainerNoteComponent,
    AgentNoteComponent,
    NoteModalComponent,
    RanksComponent,
    RankModalComponent
  ],
  providers: [
    PersonService,
    MeasureHistoryService,
    MyRegionService,
    DatePipe
  ],
  entryComponents: [
    ModalSelectPageComponent,
    EventModalComponent,
    NoteModalComponent,
    RankModalComponent
  ]
})
export class PersonPageModule {
}
