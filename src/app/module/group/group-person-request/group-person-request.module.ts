import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgxImageModule } from 'app/components/ngx-image';
import { IndividualPersonStatementModule } from 'app/module/group/person-statements/individual-person-statement/individual-person-statement.module';
import { NgxDateModule } from 'app/module/ngx/ngx-date/ngx-date.module';
import { NgxInputModule } from 'app/module/ngx/ngx-input';
import { NgxSelectModule } from 'app/module/ngx/ngx-select/ngx-select.module';
import { GroupPersonRequestComponent } from './group-person-request/group-person-request.component';

@NgModule({
  declarations: [GroupPersonRequestComponent],
  entryComponents: [GroupPersonRequestComponent],
  exports: [GroupPersonRequestComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxImageModule,
    NgxDateModule,
    NgxSelectModule,
    IndividualPersonStatementModule
  ]
})
export class GroupPersonRequestModule {
}
