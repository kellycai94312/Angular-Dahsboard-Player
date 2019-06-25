import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule, MatChipsModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {SafeHtmlModule} from '../../../pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [ItemDetailComponent],
  entryComponents: [ItemDetailComponent],
  exports: [ItemDetailComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatCardModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxImageModule,
    SafeHtmlModule
  ]
})
export class ItemDetailModule {
}
