import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupReportsRoutingModule} from './group-reports-routing.module';
import {GroupReportsComponent} from './group-reports/group-reports.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxSelectModule} from '../../../../../../module/ngx/ngx-select/ngx-select.module';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {GroupTreeModule} from '../../../../../../module/group/group-tree/group-tree.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [GroupReportsComponent],
  imports: [
    CommonModule,
    GroupReportsRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    FlexLayoutModule,
    FormsModule,
    TranslateModule.forChild(),
    NgxSelectModule,
    GroupTreeModule
  ]
})
export class GroupReportsModule {
}
