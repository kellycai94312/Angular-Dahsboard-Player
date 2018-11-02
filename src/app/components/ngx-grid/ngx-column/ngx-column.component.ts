import {Component, ContentChild, Input, TemplateRef} from '@angular/core';

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
  public style: string;

  @Input()
  public data: any;

  @Input()
  public click: (column: NgxColumnComponent) => Promise<void>;

  constructor() {
    this.style = 'col';
  }

}
