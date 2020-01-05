import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgxButtonModule } from '../ngx-button/ngx-button.module';
import { NgxVirtualScrollModule } from '../ngx-virtual-scroll/ngx-virtual-scroll.module';
import { NgxColumnComponent } from './ngx-column/ngx-column.component';
import { NgxGridComponent } from './ngx-grid/ngx-grid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    NgxButtonModule,
    NgxVirtualScrollModule,
    TranslateModule.forChild()
  ],
  declarations: [NgxGridComponent, NgxColumnComponent],
  exports: [NgxGridComponent, NgxColumnComponent]
})
export class NgxGridModule {
}
