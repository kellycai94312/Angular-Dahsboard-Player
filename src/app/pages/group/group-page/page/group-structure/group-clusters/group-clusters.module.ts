import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupClustersRoutingModule} from './group-clusters-routing.module';
import {GroupClustersComponent} from './group-clusters/group-clusters.component';
import {MatButtonModule, MatChipsModule, MatExpansionModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [GroupClustersComponent],
  imports: [
    CommonModule,
    GroupClustersRoutingModule,
    MatExpansionModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ]
})
export class GroupClustersModule {
}
