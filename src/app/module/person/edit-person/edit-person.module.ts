import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditPersonComponent} from './edit-person/edit-person.component';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {NgxDateModule} from '../../ngx/ngx-date/ngx-date.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule, MatChipsModule, MatDividerModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [EditPersonComponent],
  entryComponents: [EditPersonComponent],
  exports: [EditPersonComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    NgxInputModule,
    NgxSelectModule,
    NgxDateModule
  ]
})
export class EditPersonModule {
}
