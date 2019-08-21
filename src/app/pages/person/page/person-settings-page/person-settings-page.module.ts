import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonSettingsPageRoutingModule} from './person-settings-page-routing.module';
import {PersonSettingsPageComponent} from './person-settings-page/person-settings-page.component';
import {NgxSelectModule} from '../../../../module/ngx/ngx-select/ngx-select.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PersonDetailModule} from '../../../../module/person/person-detail/person-detail.module';

@NgModule({
  imports: [
    CommonModule,
    PersonSettingsPageRoutingModule,
    FlexLayoutModule,
    NgxSelectModule,
    PersonDetailModule
  ],
  declarations: [PersonSettingsPageComponent]
})
export class PersonSettingsPageModule {
}
