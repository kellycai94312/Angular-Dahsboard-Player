import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartHistoryComponent } from './chart-history/chart-history.component';
import { TableHistoryComponent } from './table-history/table-history.component';
import { MeasureHistoryComponent } from './measure-history.component';
import { MeasureHistoryService } from './measure-history.service';
import { TranslateModule } from '@ngx-translate/core';
import { DxDateBoxModule } from 'devextreme-angular';
import { FormsModule } from '@angular/forms';
import { TabModule } from '../tab/tab.module';
import { InfiniteListModule } from '../infinite-list/infinite-list.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    DxDateBoxModule,
    TabModule,
    InfiniteListModule,
    NgbModule
  ],
  declarations: [
    MeasureHistoryComponent,
    TableHistoryComponent,
    ChartHistoryComponent
  ],
  providers: [
    MeasureHistoryService
  ],
  exports: [
    MeasureHistoryComponent,
    TableHistoryComponent,
    ChartHistoryComponent
  ]
})
export class MeasureHistoryModule {
}
