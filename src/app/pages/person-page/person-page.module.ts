import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonPageRoutingModule } from './person-page-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PersonPageComponent } from './person-page/person-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxFormModule,
  DxListModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTagBoxModule,
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
    DxButtonModule,
    DxTemplateModule,
    DxListModule,
    DxTagBoxModule,
    FormsModule
  ],
  declarations: [
    PersonPageComponent,
    PersonsPageComponent,
    InvokeDirective
  ]
})
export class PersonPageModule {
}
