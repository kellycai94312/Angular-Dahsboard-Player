import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CareerPersonComponent} from './career-person/career-person.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';

@NgModule({
  declarations: [CareerPersonComponent],
  exports: [CareerPersonComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxSelectModule
  ]
})
export class CareerPersonModule {
}
