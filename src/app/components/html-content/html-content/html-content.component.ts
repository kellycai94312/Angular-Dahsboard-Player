import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-html-content',
  templateUrl: './html-content.component.html',
  styleUrls: ['./html-content.component.scss']
})
export class HtmlContentComponent implements OnInit {

  @Input()
  public html: string;

  constructor() {
  }

  ngOnInit() {
  }

}
