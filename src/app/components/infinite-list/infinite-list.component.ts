import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {PropertyConstant} from '../../data/local/property-constant';
import {PageQuery} from '../../data/remote/rest-api/page-query';

@Component({
  selector: 'app-infinite-list',
  templateUrl: './infinite-list.component.html',
  styleUrls: ['./infinite-list.component.scss']
})
export class InfiniteListComponent implements OnInit {

  @ContentChild(TemplateRef)
  public template: TemplateRef<any>;

  @Input()
  public items: any[];

  @Input()
  public scrollBlock = false;

  @Input()
  public wrap;

  @Output()
  public nextPage: EventEmitter<PageQuery>;

  constructor() {
    this.items = [];
    this.nextPage = new EventEmitter<PageQuery>();
    this.wrap = false;
  }

  ngOnInit() {
  }

  public onScrollDown() {
    const pageQuery = new PageQuery();
    pageQuery.from = this.items.length || 0;
    pageQuery.count = PropertyConstant.pageSize;
    this.nextPage.emit(pageQuery);
  }

}
