import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupPersonItemComponent} from './group-person-item/group-person-item.component';
import {PersonItemModule} from '../../person/person-item/person-item.module';

@NgModule({
  imports: [
    CommonModule,
    PersonItemModule
  ],
  declarations: [GroupPersonItemComponent],
  entryComponents: [GroupPersonItemComponent],
  exports: [GroupPersonItemComponent]
})
export class GroupPersonItemModule {
}
