import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatDividerModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgxGridModule } from 'app/components/ngx-grid/ngx-grid.module';
import { NgxImageModule } from 'app/components/ngx-image';
import { EditGroupPersonClaimStateModule } from 'app/module/group/edit-group-person-claim-state/edit-group-person-claim-state.module';
import { NgxDateModule } from 'app/module/ngx/ngx-date/ngx-date.module';
import { NgxInputModule } from 'app/module/ngx/ngx-input';
import { NgxSelectModule } from 'app/module/ngx/ngx-select/ngx-select.module';
import { IndividualPersonStatementComponent } from './individual-person-statement/individual-person-statement.component';

@NgModule({
  declarations: [IndividualPersonStatementComponent],
  entryComponents: [IndividualPersonStatementComponent],
  exports: [IndividualPersonStatementComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxImageModule,
    NgxInputModule,
    NgxSelectModule,
    NgxDateModule,
    NgxGridModule,
    EditGroupPersonClaimStateModule
  ]
})
export class IndividualPersonStatementModule {
}
