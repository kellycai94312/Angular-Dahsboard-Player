import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubgroupPersonListComponent} from './subgroup-person-list/subgroup-person-list.component';
import {NgxGridModule} from '../../../components/ngx-grid/ngx-grid.module';

@NgModule({
  declarations: [SubgroupPersonListComponent],
  exports: [SubgroupPersonListComponent],
  imports: [
    CommonModule,
    NgxGridModule
  ]
})
export class SubgroupPersonListModule {
}
