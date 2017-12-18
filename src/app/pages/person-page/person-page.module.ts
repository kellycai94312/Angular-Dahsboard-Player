import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonPageRoutingModule } from './person-page-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PersonPageComponent } from './person-page/person-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
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
import { InputSearchModule } from '../../components/input-search/input-search.module';
import { AnthropometryComponent } from './person-page/anthropometry/anthropometry.component';
import { PersonalComponent } from './person-page/personal/personal.component';
import { PhysiologyComponent } from './person-page/physiology/physiology.component';
import { ContactComponent } from './person-page/contact/contact.component';
import { TestsResultsComponent } from './person-page/tests-results/tests-results.component';
import { EventsComponent } from './person-page/events/events.component';
import { PersonService } from './person-page/person.service';
import { RolesModalComponent } from './person-page/roles-modal/roles-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import { SportTypesModalComponent } from './person-page/sport-types-modal/sport-types-modal.component';
import { InputSelectModule } from '../../components/input-select/input-select.module';

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
    InputSearchModule,
    InputSelectModule,
    ModalModule.forRoot()
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
    RolesModalComponent,
    SportTypesModalComponent
  ],
  providers: [
    PersonService
  ],
  entryComponents: [
    RolesModalComponent,
    SportTypesModalComponent
  ]
})
export class PersonPageModule {
}
