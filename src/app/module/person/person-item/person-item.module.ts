import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonItemComponent} from './person-item/person-item.component';
import {ItemLineModule} from '../../common/item-line/item-line.module';
import {VerticalCardModule} from '../../common/vertical-card/vertical-card.module';
import {PersonDetailModule} from '../person-detail/person-detail.module';

@NgModule({
  declarations: [PersonItemComponent],
  entryComponents: [PersonItemComponent],
  exports: [PersonItemComponent],
  imports: [
    CommonModule,
    ItemLineModule,
    VerticalCardModule,
    PersonDetailModule
  ]
})
export class PersonItemModule {
}
