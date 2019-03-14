import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubgroupsTreesComponent} from './subgroups-trees/subgroups-trees.component';
import {MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatTreeModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [SubgroupsTreesComponent],
  exports: [SubgroupsTreesComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    TranslateModule.forChild()
  ]
})
export class SubgroupsTreesModule {
}
