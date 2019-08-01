import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupNewsRoutingModule} from './group-news-routing.module';
import {GroupNewsComponent} from './group-news/group-news.component';
import {NewsListModule} from '../../../module/news/news-list/news-list.module';

@NgModule({
  declarations: [GroupNewsComponent],
  imports: [
    CommonModule,
    GroupNewsRoutingModule,
    NewsListModule
  ]
})
export class GroupNewsModule {
}
