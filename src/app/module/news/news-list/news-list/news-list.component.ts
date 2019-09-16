import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {GroupApiService} from '../../../../data/remote/rest-api/api/group/group-api.service';
import {PersonApiService} from '../../../../data/remote/rest-api/api/person/person-api.service';
import {Group} from '../../../../data/remote/model/group/base/group';
import {Person} from '../../../../data/remote/model/person';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {UtilService} from '../../../../services/util/util.service';
import {BaseNews} from '../../../../data/remote/model/group/news/base-news';
import {NewsWindowService} from '../../../../services/windows/news-window/news-window.service';
import {PersonNews} from '../../../../data/remote/model/group/news/person-news';
import {GroupNews} from '../../../../data/remote/model/group/news/group-news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  @ViewChild(NgxVirtualScrollComponent, { static: false })
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
