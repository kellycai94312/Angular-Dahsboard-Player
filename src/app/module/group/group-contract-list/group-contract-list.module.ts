import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupContractListComponent} from './group-contract-list/group-contract-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule, MatDividerModule, MatIconModule} from '@angular/material';
import {EditGroupContractModule} from '../edit-group-contract/edit-group-contract.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxGridModule} from '../../../components/ngx-grid/ngx-grid.module';

@NgModule({
  declarations: [GroupContractListComponent],
  exports: [GroupContractListComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    EditGroupContractModule,
    NgxSelectModule,
    NgxInputModule,
    NgxGridModule
  ]
})
export class GroupContractListModule {
}
