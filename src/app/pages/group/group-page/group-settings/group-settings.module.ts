import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupSettingsRoutingModule} from './group-settings-routing.module';
import {GroupSettingsComponent} from './group-settings/group-settings.component';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {NgxImageModule} from '../../../../components/ngx-image/ngx-image.module';
import {GroupMenuModule} from '../../../../module/group/group-menu/group-menu.module';

@NgModule({
  declarations: [GroupSettingsComponent],
  imports: [
    CommonModule,
    GroupSettingsRoutingModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxImageModule,
    GroupMenuModule
  ]
})
export class GroupSettingsModule {
}
