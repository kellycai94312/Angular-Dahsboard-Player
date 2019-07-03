import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParameterItemComponent} from './parameter-item/parameter-item.component';
import {MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatRippleModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {ItemLineModule} from '../../common/item-line/item-line.module';

@NgModule({
  declarations: [ParameterItemComponent],
  entryComponents: [ParameterItemComponent],
  exports: [ParameterItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatChipsModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    ItemLineModule
  ]
})
export class ParameterItemModule {
}
