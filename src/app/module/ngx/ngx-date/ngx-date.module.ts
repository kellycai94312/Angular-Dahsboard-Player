import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxDateComponent} from './ngx-date/ngx-date.component';
import {Md2DatepickerModule, Md2Module} from 'md2';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [NgxDateComponent],
  exports: [NgxDateComponent],
  imports: [
    CommonModule,
    Md2Module,
    Md2DatepickerModule,
    ReactiveFormsModule
  ]
})
export class NgxDateModule {
}
