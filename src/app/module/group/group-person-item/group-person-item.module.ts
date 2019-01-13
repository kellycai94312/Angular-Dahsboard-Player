import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupPersonItemComponent} from './group-person-item/group-person-item.component';
import {PersonItemModule} from '../../person/person-item/person-item.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PersonItemModule
  ],
  declarations: [GroupPersonItemComponent],
  entryComponents: [GroupPersonItemComponent],
  exports: [GroupPersonItemComponent]
})
export class GroupPersonItemModule {
}
