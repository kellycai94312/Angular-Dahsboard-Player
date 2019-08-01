import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupNewsPageRoutingModule} from './group-news-page-routing.module';
import {GroupNewsPageComponent} from './group-news-page/group-news-page.component';
import {NewsListModule} from '../../../../../module/news/news-list/news-list.module';

@NgModule({
  imports: [
    CommonModule,
    GroupNewsPageRoutingModule,
    NewsListModule
  ],
  declarations: [GroupNewsPageComponent]
})
export class GroupNewsPageModule {
}
