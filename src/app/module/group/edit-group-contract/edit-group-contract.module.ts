import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatDividerModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { GroupSubgroupsTreeModule } from 'app/module/group/group-subgroups-tree/group-subgroups-tree.module';
import { NgxDateModule } from '../../ngx/ngx-date/ngx-date.module';
import { NgxInputModule } from '../../ngx/ngx-input/ngx-input.module';
import { NgxSelectModule } from '../../ngx/ngx-select/ngx-select.module';
import { EditGroupContractComponent } from './edit-group-contract/edit-group-contract.component';

@NgModule({
  declarations: [EditGroupContractComponent],
  entryComponents: [EditGroupContractComponent],
  exports: [EditGroupContractComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    NgxSelectModule,
    NgxInputModule,
    NgxDateModule,
    TranslateModule,
    FormsModule,
    GroupSubgroupsTreeModule
  ]
})
export class EditGroupContractModule {
}
