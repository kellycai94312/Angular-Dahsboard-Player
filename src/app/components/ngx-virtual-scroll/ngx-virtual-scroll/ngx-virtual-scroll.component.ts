import {Component, ContentChild, TemplateRef} from '@angular/core';
import {NgxVirtualScroll} from '../bean/ngx-virtual-scroll';
import {AppHelper} from '../../../utils/app-helper';

@Component({
  selector: 'ngx-virtual-scroll',
  templateUrl: './ngx-virtual-scroll.component.html',
  styleUrls: ['./ngx-virtual-scroll.component.scss']
})
export class NgxVirtualScrollComponent extends NgxVirtualScroll {

  @ContentChild(TemplateRef, { static: false })
  public templateRef: TemplateRef<any>;

  constructor(appHelper: AppHelper) {
    super(appHelper);
  }

}
