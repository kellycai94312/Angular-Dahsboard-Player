import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemLineComponent} from './item-line/item-line.component';
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [ItemLineComponent],
  exports: [
    ItemLineComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    NgxImageModule
  ]
})
export class ItemLineModule {
}
