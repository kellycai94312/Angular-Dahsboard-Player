import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-html-content',
  templateUrl: './html-content.component.html',
  styleUrls: ['./html-content.component.scss']
})
export class HtmlContentComponent {

  @Input()
  public html: string;

}
