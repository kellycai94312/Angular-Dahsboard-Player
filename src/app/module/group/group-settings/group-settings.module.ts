import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupSettingsComponent} from './group-settings/group-settings.component';
import {TranslateModule} from '@ngx-translate/core';
import {InputSelectModule} from '../../../components/input-select/input-select.module';
import {DxSelectBoxModule} from 'devextreme-angular';
import {GroupModule} from '../../../components/group/group.module';
import {NgxButtonModule} from '../../../components/ngx-button/ngx-button.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    InputSelectModule,
    DxSelectBoxModule,
    NgxButtonModule,
    GroupModule
  ],
  declarations: [GroupSettingsComponent],
  entryComponents: [GroupSettingsComponent],
  exports: [GroupSettingsComponent]
})
export class GroupSettingsModule {
}
