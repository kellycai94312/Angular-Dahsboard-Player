import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupItemComponent} from './group-item/group-item.component';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {ItemLineModule} from '../../common/item-line/item-line.module';

@NgModule({
  imports: [
    CommonModule,
    NgxImageModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ItemLineModule
  ],
  declarations: [GroupItemComponent],
  entryComponents: [GroupItemComponent],
  exports: [GroupItemComponent]
})
export class GroupItemModule {
}
