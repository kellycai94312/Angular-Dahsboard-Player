import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventPersonItemComponent} from './event-person-item/event-person-item.component';
import {PersonItemModule} from '../../person/person-item/person-item.module';

@NgModule({
  imports: [
    CommonModule,
    PersonItemModule
  ],
  declarations: [EventPersonItemComponent],
  entryComponents: [EventPersonItemComponent],
  exports: [EventPersonItemComponent]
})
export class EventPersonItemModule {
}
