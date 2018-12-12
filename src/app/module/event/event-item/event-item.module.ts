import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventItemComponent} from './event-item/event-item.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  declarations: [EventItemComponent],
  exports: [EventItemComponent]
})
export class EventItemModule {
}
