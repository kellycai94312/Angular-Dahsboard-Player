import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupStructureRoutingModule} from './group-structure-routing.module';
import {GroupStructureComponent} from './group-structure/group-structure.component';
import {NgxTabModule} from '../../../../../components/ngx-tab/ngx-tab.module';

@NgModule({
  declarations: [GroupStructureComponent],
  imports: [
    CommonModule,
    GroupStructureRoutingModule,
    NgxTabModule
  ]
})
export class GroupStructureModule {
}
