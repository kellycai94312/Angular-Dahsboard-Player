import {Component, Input, OnInit} from '@angular/core';
import {Tab} from '../../data/local/tab';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input()
  public tabs: Tab[];

  @Input()
  public newElement: Function;

  @Input()
  public visible: Function;

  constructor() {
  }

  ngOnInit() {
  }

  onClickApply = () => {
    this.newElement();
  };

  public onCheckingVisible(item: Tab): boolean {
    if (this.visible) {
      return this.visible(item);
    }
    return true;
  }

}
