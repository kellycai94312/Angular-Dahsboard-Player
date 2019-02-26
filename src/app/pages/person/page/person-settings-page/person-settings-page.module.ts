import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonSettingsPageRoutingModule} from './person-settings-page-routing.module';
import {PersonSettingsPageComponent} from './person-settings-page/person-settings-page.component';
import {DxSelectBoxModule} from 'devextreme-angular';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    PersonSettingsPageRoutingModule,
    TranslateModule.forChild(),
    DxSelectBoxModule
  ],
  declarations: [PersonSettingsPageComponent]
})
export class PersonSettingsPageModule {
}
