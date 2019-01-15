import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupPersonPositionItemComponent} from './group-person-position-item/group-person-position-item.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [GroupPersonPositionItemComponent],
  entryComponents: [GroupPersonPositionItemComponent],
  exports: [GroupPersonPositionItemComponent]
})
export class GroupPersonPositionItemModule {
}
