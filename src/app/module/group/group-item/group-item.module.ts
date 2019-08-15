import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupItemComponent} from './group-item/group-item.component';
import {ItemLineModule} from '../../common/item-line/item-line.module';
import {VerticalCardModule} from '../../common/vertical-card/vertical-card.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ItemLineModule,
    VerticalCardModule
  ],
  declarations: [GroupItemComponent],
  entryComponents: [GroupItemComponent],
  exports: [GroupItemComponent]
})
export class GroupItemModule {
}
