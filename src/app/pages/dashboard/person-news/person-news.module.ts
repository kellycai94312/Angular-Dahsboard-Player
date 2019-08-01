import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonNewsRoutingModule} from './person-news-routing.module';
import {PersonNewsComponent} from './person-news/person-news.component';
import {NewsListModule} from '../../../module/news/news-list/news-list.module';

@NgModule({
  declarations: [PersonNewsComponent],
  imports: [
    CommonModule,
    PersonNewsRoutingModule,
    NewsListModule
  ]
})
export class PersonNewsModule {
}
