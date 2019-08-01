import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsListComponent} from './news-list/news-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxVirtualScrollModule} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {EditNewsModule} from '../edit-news/edit-news.module';
import {NewsItemModule} from '../news-item/news-item.module';
import {MatButtonModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [NewsListComponent],
  exports: [NewsListComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxVirtualScrollModule,
    EditNewsModule,
    NewsItemModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class NewsListModule {
}
