import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonSettingsPageRoutingModule} from './person-settings-page-routing.module';
import {PersonSettingsPageComponent} from './person-settings-page/person-settings-page.component';
import {NgxSelectModule} from '../../../../module/ngx/ngx-select/ngx-select.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MenuPersonDetailModule} from '../../../../module/person/menu-person-detail/menu-person-detail.module';
import {BasicPersonModule} from '../../../../module/person/basic-person/basic-person.module';
import {TranslateModule} from '@ngx-translate/core';
import {MatCardModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    PersonSettingsPageRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxSelectModule,
    MenuPersonDetailModule,
    BasicPersonModule
  ],
  declarations: [PersonSettingsPageComponent]
})
export class PersonSettingsPageModule {
}
