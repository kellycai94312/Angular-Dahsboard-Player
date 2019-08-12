import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubgroupGroupReceiptComponent} from './subgroup-group-receipt/subgroup-group-receipt.component';
import {SubgroupPersonListModule} from '../subgroup-person-list/subgroup-person-list.module';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {NgxDateModule} from '../../ngx/ngx-date/ngx-date.module';
import {TranslateModule} from '@ngx-translate/core';

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
    SubgroupPersonListModule
  ]
})
export class SubgroupGroupReceiptModule {
}
