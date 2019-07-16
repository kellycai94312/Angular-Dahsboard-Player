import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DictionariesComponent} from './dictionaries/dictionaries.component';
import {DictionaryRoutingModule} from './dictionary-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxImageModule} from '../../components/ngx-image/ngx-image.module';
import {MatCardModule, MatRippleModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ItemLineModule} from '../../module/common/item-line/item-line.module';
import {ItemListModule} from '../../module/common/item-list/item-list.module';

@NgModule({
  imports: [
    CommonModule,
    DictionaryRoutingModule,
    TranslateModule.forChild(),
    MatCardModule,
    MatRippleModule,
    FlexLayoutModule,
    ItemListModule,
    ItemLineModule,
    NgxImageModule
  ],
  declarations: [
    DictionariesComponent
  ]
})
export class DictionaryModule {
}
