import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'ngx-column',
  templateUrl: './ngx-column.component.html',
  styleUrls: ['./ngx-column.component.scss']
})
export class NgxColumnComponent {

  @Input()
  public name: string;

  @Input()
  public nameKey: string;

  @Input()
  public templateRef: TemplateRef<any>;

  @Input()
  public style: string;

  constructor() {
    this.style = 'col';
  }

}
