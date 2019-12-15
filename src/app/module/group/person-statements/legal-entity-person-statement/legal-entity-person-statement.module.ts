import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { TranslateModule } from '@ngx-translate/core';
import { NgxGridModule } from 'app/components/ngx-grid/ngx-grid.module';
import { NgxImageModule } from 'app/components/ngx-image';
import { NgxDateModule } from 'app/module/ngx/ngx-date/ngx-date.module';
import { NgxInputModule } from 'app/module/ngx/ngx-input';
import { NgxSelectModule } from 'app/module/ngx/ngx-select/ngx-select.module';
import { LegalEntityPersonStatementComponent } from './legal-entity-person-statement/legal-entity-person-statement.component';

@NgModule({
  declarations: [LegalEntityPersonStatementComponent],
  exports: [LegalEntityPersonStatementComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatStepperModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxImageModule,
    NgxInputModule,
    NgxSelectModule,
    NgxDateModule,
    NgxGridModule
  ]
})
export class LegalEntityPersonStatementModule {
}
