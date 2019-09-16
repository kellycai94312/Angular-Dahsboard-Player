import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxDateComponent} from './ngx-date/ngx-date.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {Md2DatepickerModule, Md2Module} from 'angular-md2';

@NgModule({
  declarations: [NgxDateComponent],
  exports: [NgxDateComponent],
  imports: [
    CommonModule,
    Md2Module,
    Md2DatepickerModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ]
})
export class NgxDateModule {
}
