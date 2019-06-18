import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'ngx-content',
  templateUrl: './ngx-content.component.html',
  styleUrls: ['./ngx-content.component.scss']
})
export class NgxContentComponent {

  @Input()
  public data: string | TemplateRef<any>;

  get isTemplateRef(): boolean {
    return this.data instanceof TemplateRef;
  }

}
