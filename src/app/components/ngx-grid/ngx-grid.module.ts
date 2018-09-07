import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxGridComponent} from './ngx-grid/ngx-grid.component';
import {BusyButtonModule} from '../busy-button/busy-button.module';
import {NgxVirtualScrollModule} from '../ngx-virtual-scroll/ngx-virtual-scroll.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxColumnComponent} from './ngx-column/ngx-column.component';

@NgModule({
  imports: [
    CommonModule,
    BusyButtonModule,
    NgxVirtualScrollModule,
    TranslateModule.forChild()
  ],
  declarations: [NgxGridComponent, NgxColumnComponent],
  exports: [NgxGridComponent, NgxColumnComponent, NgxVirtualScrollModule, BusyButtonModule]
})
export class NgxGridModule {
}
