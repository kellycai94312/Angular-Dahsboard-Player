import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxSelectComponent} from './ngx-select/ngx-select.component';
import {MatFormFieldModule, MatSelectModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [NgxSelectComponent],
  exports: [NgxSelectComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ]
})
export class NgxSelectModule {
}
