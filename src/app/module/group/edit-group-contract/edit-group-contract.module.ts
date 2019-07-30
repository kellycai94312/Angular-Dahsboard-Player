import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditGroupContractComponent} from './edit-group-contract/edit-group-contract.component';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxDateModule} from '../../ngx/ngx-date/ngx-date.module';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {MatCheckboxModule, MatDividerModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [EditGroupContractComponent],
  entryComponents: [EditGroupContractComponent],
  exports: [EditGroupContractComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatCheckboxModule,
    FlexLayoutModule,
    NgxSelectModule,
    NgxInputModule,
    NgxDateModule,
    TranslateModule,
    FormsModule
  ]
})
export class EditGroupContractModule {
}
