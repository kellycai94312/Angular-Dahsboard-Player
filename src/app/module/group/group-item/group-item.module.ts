import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ItemLineModule } from '../../common/item-line/item-line.module';
import { VerticalCardModule } from '../../common/vertical-card/vertical-card.module';
import { GroupDetailModule } from '../group-detail/group-detail.module';
import { GroupItemComponent } from './group-item/group-item.component';

@NgModule({
  declarations: [GroupItemComponent],
  entryComponents: [GroupItemComponent],
  exports: [GroupItemComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ItemLineModule,
    VerticalCardModule,
    GroupDetailModule
  ]
})
export class GroupItemModule {
}
