import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupPersonItemComponent} from './group-person-item/group-person-item.component';
import {PersonItemModule} from '../../person/person-item/person-item.module';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    PersonItemModule
  ],
  declarations: [GroupPersonItemComponent],
  entryComponents: [GroupPersonItemComponent],
  exports: [GroupPersonItemComponent]
})
export class GroupPersonItemModule {
}
