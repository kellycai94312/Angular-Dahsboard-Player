import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {PropertyConstant} from '../../data/local/property-constant';
import {PageQuery} from '../../data/remote/rest-api/page-query';
import {InfinityList} from '../../data/local/component/base/infinity-list';

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss']
})
export class InfiniteListComponent extends InfinityList<any, PageQuery> implements OnInit {

  @ContentChild(TemplateRef)
  public template: TemplateRef<any>;

  @Input()
  public scrollBlock: boolean;

  @Input()
  public wrap: boolean;

  /*
   * @deprecated Use getItems method
   */
  @Output()
  public nextPage: EventEmitter<PageQuery>;

  constructor() {
    super();

    this.nextPage = new EventEmitter<PageQuery>();
    this.scrollBlock = false;
    this.wrap = false;
  }

  ngOnInit() {
  }

  public async onScrollUp() {
    if (!this.rear || !this.initialized) {
      return;
    }

    const tempCount = this.query.count;
    this.rear = this.rear - this.query.count;
    if (this.rear < 0) {
      this.query.count = this.rear + this.query.count;
      this.rear = 0;
    }

    const tempFrom = this.query.from;
    this.query.from = this.rear;

    const pageContainer = await this.getItems(this.query);

    this.query.from = tempFrom;
    this.query.count = tempCount;

    if (pageContainer && pageContainer.list) {
      for (let i = pageContainer.list.length - 1; i >= 0; i--) {
        this.items.unshift(pageContainer.list[i]);
      }
      window.scrollTo(0, window.screen.availHeight);
    }
  }

  public async onScrollDown() {
    if (!this.initialized) {
      return;
    }
    if (this.getItems) {
      await this.update();
    } else {
      // TODO: Remove this code
      const pageQuery = new PageQuery();
      pageQuery.from = this.items.length || 0;
      pageQuery.count = PropertyConstant.pageSize;
      this.nextPage.emit(pageQuery);
    }
  }

}
