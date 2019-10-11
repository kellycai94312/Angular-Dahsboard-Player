import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SubgroupsTreesModule } from 'app/module/group/subgroups-trees/subgroups-trees.module';
import { GroupSubgroupsTreeComponent } from './group-subgroups-tree/group-subgroups-tree.component';

@NgModule({
  declarations: [GroupSubgroupsTreeComponent],
  entryComponents: [GroupSubgroupsTreeComponent],
  exports: [GroupSubgroupsTreeComponent],
  imports: [
    CommonModule,
    SubgroupsTreesModule
  ]
})
export class GroupSubgroupsTreeModule {
}
