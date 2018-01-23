import { Component, Input, OnInit, Type } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {

  @Input() init: Subject<any>;
  @Input() search: Function;
  @Input() dblclick: Function;
  @Input() component: Type<any>;

  active: any;
  searchBar = '';
  data: any[];

  constructor() {
  }

  async ngOnInit() {
    await this.onSearchChange();
    this.init.subscribe(event => this.onSearchChange());
  }

  async onSearchChange() {
    this.data = this.search(this.searchBar);
  }

  async onDblckick() {
    this.data = this.dblclick(this.searchBar, this.active);
  }

  async setActive(item: any) {
    this.active = item;
  }

  async onActiveChange(e: any) {
    if (e.keyCode === 38 || e.keyCode === 40) {
      const index = this.data.indexOf(this.active);
      if (e.keyCode === 38) {
        this.setActive(this.data[index < 1 ? this.data.length - 1 : index - 1]);
      } else {
        this.setActive(this.data[index > this.data.length - 2 ? 0 : index + 1]);
      }
    }
  }

}
