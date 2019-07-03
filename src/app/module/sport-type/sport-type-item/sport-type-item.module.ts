import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SportTypeItemComponent} from './sport-type-item/sport-type-item.component';
import {MatButtonModule, MatCardModule, MatIconModule, MatRippleModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {ItemLineModule} from '../../common/item-line/item-line.module';

@NgModule({
  declarations: [SportTypeItemComponent],
  exports: [SportTypeItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    ItemLineModule
  ]
})
export class SportTypeItemModule {
}
