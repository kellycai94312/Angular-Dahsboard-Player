import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditEventPersonsComponent} from './edit-event-persons/edit-event-persons.component';
import {MatButtonModule, MatExpansionModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GroupItemModule} from '../../group/group-item/group-item.module';
import {NgxBusyModule} from '../../../directives/ngx-busy/ngx-busy.module';
import {EventPersonItemModule} from '../event-person-item/event-person-item.module';

@NgModule({
  declarations: [EditEventPersonsComponent],
  entryComponents: [EditEventPersonsComponent],
  exports: [EditEventPersonsComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    NgxBusyModule,
    GroupItemModule,
    EventPersonItemModule
  ]
})
export class EditEventPersonsModule {
}
