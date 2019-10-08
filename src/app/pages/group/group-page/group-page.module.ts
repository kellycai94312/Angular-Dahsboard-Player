import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GroupHeadModule } from 'app/module/group/group-head/group-head.module';
import { GroupMenuModule } from 'app/module/group/group-menu/group-menu.module';
import { GroupPersonItemModule } from 'app/module/group/group-person-item/group-person-item.module';
import { GroupPositionItemModule } from 'app/module/group/group-position/group-position-item/group-position-item.module';
import { NgxTabsModule } from 'app/module/ngx/ngx-tabs/ngx-tabs.module';
import { GroupPageRoutingModule } from './group-page-routing.module';
import { GroupPageComponent } from './group-page/group-page.component';

@NgModule({
  declarations: [GroupPageComponent],
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
