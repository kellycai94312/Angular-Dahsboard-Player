import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseLibraryItemComponent} from './base-library-item/base-library-item.component';
import {ItemLineModule} from '../../common/item-line/item-line.module';
import {BaseCardModule} from '../../common/base-card/base-card.module';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';

@NgModule({
  declarations: [BaseLibraryItemComponent],
  exports: [BaseLibraryItemComponent],
  imports: [
    CommonModule,
    ItemLineModule,
    BaseCardModule,
    NgxImageModule
  ]
})
export class BaseLibraryItemModule {
}
