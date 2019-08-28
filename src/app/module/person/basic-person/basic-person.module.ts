import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicPersonComponent} from './basic-person/basic-person.component';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {NgxDateModule} from '../../ngx/ngx-date/ngx-date.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [BasicPersonComponent],
  entryComponents: [BasicPersonComponent],
  exports: [BasicPersonComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxInputModule,
    NgxSelectModule,
    NgxDateModule
  ]
})
export class BasicPersonModule {
}
