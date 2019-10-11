import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgxImageModule } from 'app/components/ngx-image/ngx-image.module';
import { GroupMenuModule } from 'app/module/group/group-menu/group-menu.module';
import { GroupSettingsRoutingModule } from './group-settings-routing.module';
import { GroupSettingsComponent } from './group-settings/group-settings.component';

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
