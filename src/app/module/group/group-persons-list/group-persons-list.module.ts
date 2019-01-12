import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupPersonsListComponent} from './group-persons-list/group-persons-list.component';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {GroupPersonItemModule} from '../group-person-item/group-person-item.module';

@NgModule({
  imports: [
    CommonModule,
    NgxVirtualScrollModule,
    GroupPersonItemModule
  ],
  declarations: [GroupPersonsListComponent],
  exports: [GroupPersonsListComponent]
})
export class GroupPersonsListModule {
}
