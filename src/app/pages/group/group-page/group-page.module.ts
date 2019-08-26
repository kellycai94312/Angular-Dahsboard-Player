import {NgModule} from '@angular/core';
import {GroupPageRoutingModule} from './group-page-routing.module';
import {GroupPageComponent} from './group-page/group-page.component';
import {NgxButtonModule} from '../../../components/ngx-button/ngx-button.module';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {NgxSplitButtonModule} from '../../../components/ngx-split-button/ngx-split-button.module';
import {NgxModalModule} from '../../../components/ngx-modal/ngx-modal.module';
import {NgxImageModule} from '../../../components/ngx-image/ngx-image.module';
import {GroupPersonPositionItemModule} from '../../../module/group/group-person-position-item/group-person-position-item.module';
import {GroupPersonItemModule} from '../../../module/group/group-person-item/group-person-item.module';
import {NgxTabsModule} from '../../../module/ngx/ngx-tabs/ngx-tabs.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GroupService} from './service/group.service';
import {GroupPositionItemModule} from '../../../module/group/group-position/group-position-item/group-position-item.module';

@NgModule({
  imports: [
    CommonModule,
    GroupPageRoutingModule,
    TranslateModule.forChild(),
    NgxImageModule,
    NgxButtonModule,
    NgxTabsModule,
    NgxModalModule,
    NgxSplitButtonModule,
    GroupPersonPositionItemModule,
    GroupPersonItemModule,
    GroupPositionItemModule,
    FlexLayoutModule
  ],
  declarations: [GroupPageComponent],
  providers: [GroupService]
})
export class GroupPageModule {
}
