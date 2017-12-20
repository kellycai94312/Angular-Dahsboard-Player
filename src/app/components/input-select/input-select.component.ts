import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { PageContainer } from '../../data/remote/bean/page-container';
import { ScrollService } from './scroll/scroll.service';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit {

  @Input() loadData: Function;
  @Input() model: any;
  @Input() pageSize: number;

  @Input() key: any;
  @Input() display: any;
  @Input() placeholder: string;
  @Input() disabled: boolean;

  @Output() modelChange;
  @Output() onChange;

  active = false;
  value: string;
  data: any[];
  private pageNumber;
  private empty: Object = {};
  private searchChanged: Subject<any>;

  constructor(private eRef: ElementRef,
              private renderer: Renderer2,
              private scrollService: ScrollService) {
    this.modelChange = new EventEmitter<any>();
    this.onChange = new EventEmitter<any>();
    this.searchChanged = new Subject<any>();
    this.searchChanged
      .debounceTime(400)
      .subscribe(() => {
        this.clearData();
        this.load();
      });
  }

  ngOnInit() {
    if (!this.pageSize) {
      this.pageSize = 30;
    }
    if (!this.placeholder) {
      this.placeholder = 'Select an option';
    }
    setTimeout(() => this.value = this.model ? this.model[this.display] : this.placeholder, 100);
    this.clearData();
  }

  /** show dropdown list */
  showList() {
    this.active = true;
    if (!this.model || this.model === this.empty) {
      this.value = ''; // clear value when not selected
    }
    this.load();
    this.pageNumber += 1;
  }

  /** hide dropdown list */
  @HostListener('document:click', ['$event'])
  hideList(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.resetSearch();
    }
  }

  /** load more data */
  fetchMore = (e: any) => {
    if (e.start === 0) {
      return;
    }
    const diff = this.pageSize * (this.pageNumber - 1) - e.end;
    if (diff < 10) {
      this.load();
      this.pageNumber += 1;
    }
  }

  /** select an element from the list*/
  select(item: any): void {
    this.model = item === this.empty ? null : item; // set empty element if no data selected
    this.modelChange.emit(this.model);
    this.onChange.emit({});
    this.resetSearch();
  }

  searchData(e) {
    if (e.keyCode === 38 || e.keyCode === 40) {
      const index = this.data.indexOf(this.model);
      const src = e.srcElement;
      const wrapper = src.parentElement.parentElement;
      const scrollMenu = wrapper.children[1];
      const childSize: number = this.scrollService.getChildLength(scrollMenu);
      if (e.keyCode === 38) {
        if (index >= 0) {
          this.model = index === 0 ? this.empty : this.data[index - 1];
          scrollMenu.scrollTop = childSize * (index - 4 );
        } else {
          scrollMenu.scrollTop = childSize * this.data.length;
          this.model = this.data[this.data.length - 1];
        }
      } else {
        if (index > this.data.length - 2) {
          scrollMenu.scrollTop = 0;
          this.model = this.empty;
        } else {
          this.model = this.data[index + 1];
          scrollMenu.scrollTop = childSize * (index - 2 );
        }
      }
    } else if (e.keyCode === 13) {
      this.select(this.model);
      const searchBar = this.renderer.selectRootElement('#searchBar');
      searchBar.parentElement.parentElement.focus();
    } else {
      this.searchChanged.next(e);
    }
  }

  private async load() {
    const result: PageContainer<any> = (await this.loadData({
      from: this.pageSize * (this.pageNumber - 1),
      count: this.pageSize,
      name: this.value
    })).list;
    this.data = this.data.concat(result);
  }

  private clearData(): void {
    this.data = [];
    this.pageNumber = 1;
  }

  /** clear dropdown list */
  private resetSearch(): void {
    this.active = false;
    this.value = this.model ? this.model[this.display] : this.placeholder;
    this.clearData();
  }

}
