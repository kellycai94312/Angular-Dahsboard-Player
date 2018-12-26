import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxGridComponent} from './ngx-grid/ngx-grid.component';
import {NgxVirtualScrollModule} from '../ngx-virtual-scroll/ngx-virtual-scroll.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxColumnComponent} from './ngx-column/ngx-column.component';
import {NgxCheckBoxModule} from '../ngx-check-box/ngx-check-box.module';
import {NgxButtonModule} from '../ngx-button/ngx-button.module';

@NgModule({
  imports: [
    CommonModule,
    NgxButtonModule,
    NgxVirtualScrollModule,
    TranslateModule.forChild(),
    NgxCheckBoxModule
  ],
  declarations: [NgxGridComponent, NgxColumnComponent],
  exports: [NgxGridComponent, NgxColumnComponent]
})
export class NgxGridModule {
}
