import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupReportsRoutingModule} from './group-reports-routing.module';
import {GroupReportsComponent} from './group-reports/group-reports.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {InputSelectModule} from '../../../../../../components/input-select/input-select.module';
import {NgxTreeModule} from '../../../../../../module/ngx/ngx-tree/ngx-tree.module';
import {NgxSelectModule} from '../../../../../../module/ngx/ngx-select/ngx-select.module';
import {NgxGridModule} from '../../../../../../components/ngx-grid/ngx-grid.module';
import {MatButtonModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [GroupReportsComponent],
  imports: [
    CommonModule,
    GroupReportsRoutingModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    InputSelectModule,
    NgxTreeModule,
    NgxSelectModule,
    NgxGridModule
  ]
})
export class GroupReportsModule {
}
