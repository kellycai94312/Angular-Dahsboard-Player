import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonDetailComponent} from './person-detail/person-detail.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BasicPersonModule} from '../basic-person/basic-person.module';
import {TranslateModule} from '@ngx-translate/core';
import {MenuPersonDetailModule} from '../menu-person-detail/menu-person-detail.module';
import {PersonHeadModule} from '../person-head/person-head.module';

@NgModule({
  declarations: [PersonDetailComponent],
  entryComponents: [PersonDetailComponent],
  exports: [PersonDetailComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    MenuPersonDetailModule,
    BasicPersonModule,
    PersonHeadModule
  ]
})
export class PersonDetailModule {
}
