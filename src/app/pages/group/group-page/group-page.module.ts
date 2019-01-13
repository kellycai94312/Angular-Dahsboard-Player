import {NgModule} from '@angular/core';
import {GroupPageRoutingModule} from './group-page-routing.module';
import {GroupPageComponent} from './group-page/group-page.component';
import {NgxButtonModule} from '../../../components/ngx-button/ngx-button.module';
import {NgxTabModule} from '../../../components/ngx-tab/ngx-tab.module';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgxSplitButtonModule} from '../../../components/ngx-split-button/ngx-split-button.module';
import {GroupSettingsModule} from '../../../module/group/group-settings/group-settings.module';
import {NgxModalModule} from '../../../components/ngx-modal/ngx-modal.module';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {GroupPersonPositionItemModule} from '../../../module/group/group-person-position-item/group-person-position-item.module';

@NgModule({
  imports: [
    CommonModule,
    GroupPageRoutingModule,
    TranslateModule.forChild(),
    NgxImageModule,
    NgxButtonModule,
    NgxTabModule,
    NgxModalModule,
    NgxSplitButtonModule,
    GroupSettingsModule,
    GroupPersonPositionItemModule
  ],
  declarations: [GroupPageComponent]
})
export class GroupPageModule {
}
