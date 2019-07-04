import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemListComponent} from './item-list/item-list.component';
import {MatButtonModule, MatDividerModule, MatIconModule, MatRippleModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ItemListComponent],
  exports: [ItemListComponent],
  imports: [
    CommonModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatDividerModule,
    FlexLayoutModule,
    NgxInputModule,
    NgxVirtualScrollModule,
    TranslateModule.forChild(),
    ReactiveFormsModule
  ]
})
export class ItemListModule {
}
