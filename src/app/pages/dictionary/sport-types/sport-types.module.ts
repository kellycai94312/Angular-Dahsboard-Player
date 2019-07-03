import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SportTypesRoutingModule} from './sport-types-routing.module';
import {SportTypesComponent} from './sport-types/sport-types.component';
import {SportTypeListModule} from '../../../module/sport-type/sport-type-list/sport-type-list.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [SportTypesComponent],
  imports: [
    CommonModule,
    SportTypesRoutingModule,
    SportTypeListModule,
    TranslateModule.forChild()
  ]
})
export class SportTypesModule {
}
