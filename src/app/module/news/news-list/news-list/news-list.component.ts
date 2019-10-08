import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { Direction } from 'app/components/ngx-virtual-scroll/model/direction';
import { NgxVirtualScrollComponent } from 'app/components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import { Group } from 'app/data/remote/model/group/base';
import { BaseNews, GroupNews, PersonNews } from 'app/data/remote/model/group/news';
import { Person } from 'app/data/remote/model/person';
import { GroupApiService, PersonApiService } from 'app/data/remote/rest-api/api';
import { PageQuery } from 'app/data/remote/rest-api/page-query';
import { UtilService } from 'app/services/util/util.service';
import { NewsWindowService } from 'app/services/windows/news-window/news-window.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  @ViewChild(NgxVirtualScrollComponent, {static: true})
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public canEdit: boolean;

  @Input()
  public group: Group;

  @Input()
  public person: Person;

  constructor(private _groupApiService: GroupApiService,
              private _personApiService: PersonApiService,
              private _utilService: UtilService,
              public _componentFactoryResolver: ComponentFactoryResolver,
              private _newsWindowService: NewsWindowService) {
  }

  public async ngOnInit(): Promise<void> {
    await this.ngxVirtualScrollComponent.reset();
  }

  public async onAdd(): Promise<void> {
    let news: BaseNews = new PersonNews();
    if (this.group) {
      news = new GroupNews();
      (news as GroupNews).group = this.group;
    }

    const dialogResult = await this._newsWindowService.openEditNewsWindow(news, {componentFactoryResolver: this._componentFactoryResolver});
    if (dialogResult.result) {
      this.ngxVirtualScrollComponent.items.unshift(dialogResult.data);
    }
  }

  public fetchItems = async (direction: Direction, pageQuery: PageQuery) => {
    if (this.group) {
      return await this._groupApiService.getGroupNews(this.group, pageQuery).toPromise();
    } else if (this.person) {
      return await this._personApiService.getPersonNews(this.person, pageQuery).toPromise();
    }
    return await this._personApiService.getGroupNews(pageQuery).toPromise();
  };

}
