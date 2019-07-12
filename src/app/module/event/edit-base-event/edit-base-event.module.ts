import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditBaseEventComponent} from './edit-base-event/edit-base-event.component';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {EditEventPersonsModule} from '../edit-event-persons/edit-event-persons.module';
import {NgxDateModule} from '../../ngx/ngx-date/ngx-date.module';

@NgModule({
  declarations: [EditBaseEventComponent],
  entryComponents: [EditBaseEventComponent],
  exports: [EditBaseEventComponent],
  imports: [
    CommonModule,
    NgxInputModule,
    NgxSelectModule,
    NgxDateModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    EditEventPersonsModule
  ]
})
export class EditBaseEventModule {
}
