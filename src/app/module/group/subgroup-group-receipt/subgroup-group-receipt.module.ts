import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgxGridModule } from 'app/components/ngx-grid/ngx-grid.module';
import { NgxDateModule } from 'app/module/ngx/ngx-date/ngx-date.module';
import { NgxInputModule } from 'app/module/ngx/ngx-input';
import { SubgroupGroupReceiptComponent } from './subgroup-group-receipt/subgroup-group-receipt.component';

@NgModule({
  declarations: [SubgroupGroupReceiptComponent],
  entryComponents: [SubgroupGroupReceiptComponent],
  exports: [SubgroupGroupReceiptComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxDateModule,
    NgxGridModule,
    FormsModule
  ]
})
export class SubgroupGroupReceiptModule {
}
