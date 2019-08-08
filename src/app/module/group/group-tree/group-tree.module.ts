import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupTreeComponent} from './group-tree/group-tree.component';
import {NgxTreeModule} from '../../ngx/ngx-tree/ngx-tree.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [GroupTreeComponent],
  exports: [GroupTreeComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxTreeModule,
    NgxSelectModule
  ]
})
export class GroupTreeModule {
}
