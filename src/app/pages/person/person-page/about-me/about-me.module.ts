import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutMeRoutingModule} from './about-me-routing.module';
import {AboutMeComponent} from './about-me/about-me.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {BasicPersonModule} from '../../../../module/person/basic-person/basic-person.module';
import {CareerPersonModule} from '../../../../module/person/career-person/career-person.module';
import {PersonContactListModule} from '../../../../module/person/person-contact-list/person-contact-list.module';

@NgModule({
  declarations: [AboutMeComponent],
  imports: [
    CommonModule,
    AboutMeRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    BasicPersonModule,
    CareerPersonModule,
    PersonContactListModule
  ]
})
export class AboutMeModule {
}
