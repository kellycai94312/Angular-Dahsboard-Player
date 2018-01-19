import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { GroupsPageComponent } from './groups-page/groups-page.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { GroupPageRoutingModule } from './group-page-routing.module';
import { LayoutService } from '../../layout/shared/layout.service';
import { AllGroupsComponent } from './groups-page/all-groups/all-groups.component';
import { MyGroupsComponent } from './groups-page/my-groups/my-groups.component';
import { DxButtonModule, DxSelectBoxModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NewGroupPageComponent } from './new-group-page/new-group-page.component';
import { GroupItemComponent } from './group-item/group-item.component';

@NgModule({
  imports: [
    CommonModule,
    GroupPageRoutingModule,
    TranslateModule.forChild(),
    DxButtonModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    InfiniteScrollModule
  ],
  providers: [
    LayoutService
  ],
  declarations: [
    GroupsPageComponent,
    GroupPageComponent,
    AllGroupsComponent,
    MyGroupsComponent,
    NewGroupPageComponent,
    GroupItemComponent
  ]
})
export class GroupPageModule {
}
