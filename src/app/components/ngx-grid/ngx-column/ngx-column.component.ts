import {Component, ContentChild, Input, TemplateRef} from '@angular/core';
import {Subject} from 'rxjs';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {Sort} from '../../../data/remote/rest-api/sort';

@Component({
  selector: 'ngx-column',
  templateUrl: './ngx-column.component.html',
  styleUrls: ['./ngx-column.component.scss']
})
export class NgxColumnComponent {

  get contentChild(): TemplateRef<any> {
    return this._contentChild;
  }

  @ContentChild(TemplateRef)
  set contentChild(value: TemplateRef<any>) {
    this._contentChild = value;
    if (!this.templateRef && this._contentChild) {
      this.templateRef = this._contentChild;
    }
  }

  private _contentChild: TemplateRef<any>;

  @Input()
  public name: string;

  @Input()
  public nameKey: string;

  @Input()
  public templateRef: TemplateRef<any>;

  @Input()
  public displayValue: (obj: any) => string;

  @Input()
  public class: string;

  @Input()
  public data: any;

  @Input()
  public click: (column: NgxColumnComponent) => Promise<void>;

  @Input()
  public sortName: string;

  @Input()
  public width: string;

  public sort: Sort;

  public readonly sortSubject: Subject<NameWrapper<Sort>>;

  constructor() {
    this.sortSubject = new Subject<NameWrapper<Sort>>();
  }

  public onSortChange() {
    const items = Object.keys(Sort);
    let itemIndex = items.findIndex(x => x === this.sort);
    itemIndex++;
    if (itemIndex >= items.length) {
      this.sort = null;
    } else {
      this.sort = Sort[items[itemIndex]];
    }
    this.sortSubject.next({name: this.sortName, data: this.sort});
  }

}
