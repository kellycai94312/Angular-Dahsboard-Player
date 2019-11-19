import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { Md2DatepickerModule, Md2Module } from 'angular-md2';
import { NgxDateComponent } from './ngx-date/ngx-date.component';

@NgModule({
  declarations: [NgxDateComponent],
  exports: [NgxDateComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    Md2Module,
    Md2DatepickerModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ]
})
export class NgxDateModule {
}
