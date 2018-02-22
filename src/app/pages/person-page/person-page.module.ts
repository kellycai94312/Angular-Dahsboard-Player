import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonPageRoutingModule } from './person-page-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PersonPageComponent } from './person-page/person-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
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
import { PhysiologyComponent } from './person-page/physiology/physiology.component';
import { ContactComponent } from './person-page/contact/contact.component';
import { TestsResultsComponent } from './person-page/tests-results/tests-results.component';
import { EventsComponent } from './person-page/events/events.component';
import { PersonService } from './person-page/person.service';
import { ModalModule } from 'ngx-bootstrap';
import { InputSelectModule } from '../../components/input-select/input-select.module';
import { ModalSelectModule } from '../../components/modal-select/modal-select.module';
import { ModalSelectComponent } from '../../components/modal-select/modal-select.component';
import { SportTypeItemComponent } from './person-page/sport-type-item/sport-type-item.component';
import { UserRoleItemComponent } from './person-page/user-role-item/user-role-item.component';
import { InfiniteListModule } from '../../components/infinite-list/infinite-list.module';
import { GroupsComponent } from './person-page/groups/groups.component';
import { GroupPageModule } from '../groups/group-page.module';
import { GroupPersonComponent } from './person-page/group-person/group-person.component';
import { PersonModule } from '../../components/person/person.module';
import { MeasureHistoryComponent } from './person-page/tests-results/measure-history/measure-history.component';
import { ModalSelectPageComponent } from '../../components/modal-select-page/modal-select-page.component';
import { ModalSelectPageModule } from '../../components/modal-select-page/modal-select-page.module';
import { ExerciseMeasureItemModule } from '../../components/exercise-measure-item/exercise-measure-item.module';

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
    ModalSelectModule,
    ModalSelectPageModule,
    GroupPageModule,
    PersonModule,
    DxDataGridModule,
    ExerciseMeasureItemModule
  ],
  declarations: [
    PersonPageComponent,
    PersonsPageComponent,
    InvokeDirective,
    AnthropometryComponent,
    PersonalComponent,
    PhysiologyComponent,
    ContactComponent,
    TestsResultsComponent,
    EventsComponent,
    SportTypeItemComponent,
    UserRoleItemComponent,
    GroupsComponent,
    GroupPersonComponent,
    MeasureHistoryComponent
  ],
  providers: [
    PersonService
  ],
  entryComponents: [
    ModalSelectComponent,
    ModalSelectPageComponent,
    SportTypeItemComponent,
    UserRoleItemComponent
  ]
})
export class PersonPageModule {
}
