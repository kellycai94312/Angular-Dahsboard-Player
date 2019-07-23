import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupPersonItemComponent} from './group-person-item/group-person-item.component';
import {PersonItemModule} from '../../person/person-item/person-item.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    PersonItemModule
  ],
  declarations: [GroupPersonItemComponent],
  entryComponents: [GroupPersonItemComponent],
  exports: [GroupPersonItemComponent]
})
export class GroupPersonItemModule {
}
