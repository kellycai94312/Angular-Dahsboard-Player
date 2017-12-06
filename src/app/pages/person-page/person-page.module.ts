import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonPageRoutingModule } from './person-page-routing.module';
import { PersonService } from './person.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PersonPageComponent } from './person-page/person-page.component';
import { PersonListPageComponent } from './person-list-page/person-list-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  DxDateBoxModule, DxFormModule, DxLookupModule, DxSelectBoxModule, DxTextAreaModule,
  DxTextBoxModule, DxValidatorModule
} from 'devextreme-angular';
import { HttpLoaderFactory } from '../../app.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DxiValidationRuleModule } from 'devextreme-angular/ui/nested/validation-rule-dxi';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PersonPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule.forRoot(),
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxFormModule,
    DxTextBoxModule,
    DxValidatorModule,
    DxiValidationRuleModule,
    DxLookupModule
  ],
  declarations: [
    PersonPageComponent,
    PersonListPageComponent
  ],
  providers: [
    PersonService
  ]
})
export class PersonPageModule {
}
