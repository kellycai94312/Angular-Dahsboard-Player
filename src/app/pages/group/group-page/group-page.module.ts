import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GroupHeadModule } from '../../../module/group/group-head/group-head.module';
import { GroupMenuModule } from '../../../module/group/group-menu/group-menu.module';
import { GroupPersonItemModule } from '../../../module/group/group-person-item/group-person-item.module';
import { GroupPositionItemModule } from '../../../module/group/group-position/group-position-item/group-position-item.module';
import { NgxTabsModule } from '../../../module/ngx/ngx-tabs/ngx-tabs.module';
import { GroupPageRoutingModule } from './group-page-routing.module';
import { GroupPageComponent } from './group-page/group-page.component';
import { GroupService } from './service/group.service';

@NgModule({
  declarations: [GroupPageComponent],
  providers: [GroupService],
  imports: [
    CommonModule,
    GroupPageRoutingModule,
    FlexLayoutModule,
    NgxTabsModule,
    GroupHeadModule,
    GroupPersonItemModule,
    GroupPositionItemModule,
    GroupMenuModule
  ]
})
export class GroupPageModule {
}
