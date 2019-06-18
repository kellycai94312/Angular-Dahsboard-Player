import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditFormulaComponent} from './edit-formula/edit-formula.component';
import {MatButtonModule, MatChipsModule, MatDividerModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {NgxModalModule} from '../../../components/ngx-modal/ngx-modal.module';
import {ParameterItemModule} from '../parameter-item/parameter-item.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ParameterWindowService} from '../../../services/windows/parameter-window/parameter-window.service';
import {ParameterListModule} from '../parameter-list/parameter-list.module';

@NgModule({
  declarations: [EditFormulaComponent],
  entryComponents: [EditFormulaComponent],
  providers: [ParameterWindowService],
  exports: [EditFormulaComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxModalModule,
    ParameterItemModule,
    ParameterListModule
  ]
})
export class EditFormulaModule {
}
