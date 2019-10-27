import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-html-content',
  templateUrl: './html-content.component.html',
  styleUrls: ['./html-content.component.scss']
})
export class HtmlContentComponent {

  @ViewChild('container', {static: true, read: ViewContainerRef})
  public containerRef: ViewContainerRef;

  @Input()
  public html: string;

}
