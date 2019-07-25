import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartHistoryComponent} from './chart-history/chart-history.component';
import {TableHistoryComponent} from './table-history/table-history.component';
import {MeasureHistoryComponent} from './measure-history.component';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MeasureHistoryService} from './measure-history.service';
import {NgxVirtualScrollModule} from '../ngx-virtual-scroll/ngx-virtual-scroll.module';
import {NgxTabModule} from '../ngx-tab/ngx-tab.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild(),
    NgxTabModule,
    NgxVirtualScrollModule,
    NgbModule
  ],
  declarations: [
    MeasureHistoryComponent,
    TableHistoryComponent,
    ChartHistoryComponent
  ],
  exports: [
    MeasureHistoryComponent,
    TableHistoryComponent,
    ChartHistoryComponent
  ],
  providers: [
    MeasureHistoryService
  ]
})
export class MeasureHistoryModule {
}
