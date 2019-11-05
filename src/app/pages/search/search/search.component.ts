import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public items: Array<any> = [];
  public menuSize = '20%';

  public ngOnInit(): void {
    this.items = [
      {link: '/search/person', iconName: 'person', name: 'persons.section'},
      {link: '/search/group', iconName: 'group', name: 'group'}
    ];
  }

  public onToggleMenuVisibility(): void {
    if (this.menuSize === '46px') {
      this.menuSize = '20%';
    } else {
      this.menuSize = '46px';
    }
  }

}
