import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupSettingsComponent} from './group-settings/group-settings.component';
import {TranslateModule} from '@ngx-translate/core';
import {GroupModule} from '../../../components/group/group.module';
import {NgxButtonModule} from '../../../components/ngx-button/ngx-button.module';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {InputSelectModule} from '../../../components/input-select/input-select.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxSelectModule,
    NgxButtonModule,
    GroupModule,
    InputSelectModule
  ],
  declarations: [GroupSettingsComponent],
  entryComponents: [GroupSettingsComponent],
  exports: [GroupSettingsComponent]
})
export class GroupSettingsModule {
}
