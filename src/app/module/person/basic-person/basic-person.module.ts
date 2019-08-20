import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicPersonComponent} from './basic-person/basic-person.component';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {NgxDateModule} from '../../ngx/ngx-date/ngx-date.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [BasicPersonComponent],
  entryComponents: [BasicPersonComponent],
  exports: [BasicPersonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxSelectModule,
    NgxDateModule
  ]
})
export class BasicPersonModule {
}
