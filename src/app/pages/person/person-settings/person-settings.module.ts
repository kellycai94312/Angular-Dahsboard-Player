import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonSettingsRoutingModule} from './person-settings-routing.module';
import {PersonSettingsComponent} from './person-settings/person-settings.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule, MatCardModule} from '@angular/material';

@NgModule({
  declarations: [PersonSettingsComponent],
  imports: [
    CommonModule,
    PersonSettingsRoutingModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild()
  ]
})
export class PersonSettingsModule {
}
