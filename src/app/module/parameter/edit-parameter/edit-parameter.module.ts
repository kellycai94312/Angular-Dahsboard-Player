import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditParameterComponent} from './edit-parameter/edit-parameter.component';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';

@NgModule({
  declarations: [EditParameterComponent],
  entryComponents: [EditParameterComponent],
  exports: [EditParameterComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    FormsModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxSelectModule
  ]
})
export class EditParameterModule {
}
