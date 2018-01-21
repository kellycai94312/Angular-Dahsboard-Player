import { Component, Input, OnInit } from '@angular/core';
import { Tab } from '../../data/local/tab';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input()
  public tabs: Tab[];

  constructor() {
  }

  ngOnInit() {
  }

}
