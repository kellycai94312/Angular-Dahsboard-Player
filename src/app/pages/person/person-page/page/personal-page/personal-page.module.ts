import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonalPageRoutingModule} from './personal-page-routing.module';
import {PersonalPageComponent} from './personal-page/personal-page.component';
import {NgxButtonModule} from '../../../../../components/ngx-button/ngx-button.module';
import {NgxInputModule} from '../../../../../module/ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../../../../module/ngx/ngx-select/ngx-select.module';
import {NgxDateModule} from '../../../../../module/ngx/ngx-date/ngx-date.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    PersonalPageRoutingModule,
    FlexLayoutModule,
    NgxInputModule,
    NgxSelectModule,
    NgxDateModule,
    NgxButtonModule
  ],
  declarations: [PersonalPageComponent]
})
export class PersonalPageModule {
}
