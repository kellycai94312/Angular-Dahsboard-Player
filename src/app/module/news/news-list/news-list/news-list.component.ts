import { Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
export class NewsListComponent implements OnInit, OnChanges {

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
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _newsWindowService: NewsWindowService) {
  }

  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (this.ngxVirtualScrollComponent && changes.group && !changes.group.firstChange) {
      await this.ngxVirtualScrollComponent.reset();
    }
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
      return this._groupApiService.getGroupNews(this.group, pageQuery).toPromise();
    } else if (this.person) {
      return this._personApiService.getPersonNews(this.person, pageQuery).toPromise();
    }
    return this._personApiService.getGroupNews(pageQuery).toPromise();
  };

}
