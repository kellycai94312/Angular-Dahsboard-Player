import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubgroupsTreesComponent} from './subgroups-trees/subgroups-trees.component';
import {MatButtonModule, MatIconModule, MatMenuModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {NgxTreeModule} from '../../ngx/ngx-tree/ngx-tree.module';

@NgModule({
  declarations: [SubgroupsTreesComponent],
  exports: [SubgroupsTreesComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    TranslateModule.forChild(),
    NgxTreeModule
  ]
})
export class SubgroupsTreesModule {
}
