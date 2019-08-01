import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsItemComponent} from './news-item/news-item.component';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UrlParserModule} from '../../../pipes/url-parser/url-parser.module';
import {RouterModule} from '@angular/router';
import {EditNewsModule} from '../edit-news/edit-news.module';

@NgModule({
  declarations: [NewsItemComponent],
  exports: [NewsItemComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    RouterModule.forChild([]),
    UrlParserModule,
    EditNewsModule
  ]
})
export class NewsItemModule {
}
