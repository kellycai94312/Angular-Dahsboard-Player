import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventPageComponent} from './event-page/event-page.component';
import {EventsPageComponent} from './events-page/events-page.component';
import {EventRoutingModule} from './event-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {InfiniteListModule} from '../../components/infinite-list/infinite-list.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    TranslateModule.forChild(),
    InfiniteListModule,
    FormsModule
  ],
  declarations: [EventPageComponent, EventsPageComponent]
})
export class EventModule {
}
