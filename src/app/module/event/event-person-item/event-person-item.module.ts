import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventPersonItemComponent} from './event-person-item/event-person-item.component';
import {PersonItemModule} from '../../person/person-item/person-item.module';
import {BaseEventApiService} from '../../../data/remote/rest-api/api/event/base-event-api/base-event-api.service';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    PersonItemModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  declarations: [EventPersonItemComponent],
  entryComponents: [EventPersonItemComponent],
  providers: [BaseEventApiService],
  exports: [EventPersonItemComponent]
})
export class EventPersonItemModule {
}
