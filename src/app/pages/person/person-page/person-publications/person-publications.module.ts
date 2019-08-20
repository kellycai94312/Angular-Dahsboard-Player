import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonPublicationsRoutingModule} from './person-publications-routing.module';
import {PersonPublicationsComponent} from './person-publications/person-publications.component';
import {NewsListModule} from '../../../../module/news/news-list/news-list.module';

@NgModule({
  declarations: [PersonPublicationsComponent],
  imports: [
    CommonModule,
    PersonPublicationsRoutingModule,
    NewsListModule
  ]
})
export class PersonPublicationsModule {
}
