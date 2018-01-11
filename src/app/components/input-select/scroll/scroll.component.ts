import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ScrollService } from './scroll.service';
import { Scroll } from './scroll';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})
export class ScrollComponent implements OnInit {

  @Input() fetchMore: Function;

  constructor(private scrollService: ScrollService) {
  }

  ngOnInit() {
  }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    const src = event.srcElement;
    const scroll: Scroll = this.scrollService.getScrollPositions(src);
    this.fetchMore(scroll);
  }

}
