import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupStructureRoutingModule} from './group-structure-routing.module';
import {GroupStructureComponent} from './group-structure/group-structure.component';
import {NgxTabsModule} from '../../../../../module/ngx/ngx-tabs/ngx-tabs.module';

@NgModule({
  declarations: [GroupStructureComponent],
  imports: [
    CommonModule,
    GroupStructureRoutingModule,
    NgxTabsModule
  ]
})
export class GroupStructureModule {
}
