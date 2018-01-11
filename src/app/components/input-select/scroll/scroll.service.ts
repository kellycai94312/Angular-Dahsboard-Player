import { Injectable } from '@angular/core';
import { Scroll } from './scroll';

@Injectable()
export class ScrollService {

  constructor() {
  }

  getScrollPositions(src: any): Scroll {
    const childHeight: number = this.getChildLength(src);
    const offsetHeight = src.offsetHeight;
    const top = src.scrollTop;
    const bottom = src.scrollTop + offsetHeight;
    const scroll = new Scroll();
    scroll.start = Math.round(top / childHeight);
    scroll.end = Math.round((bottom / childHeight) - 1);
    return scroll;
  }

  getChildLength(src: Element): number {
    return src.scrollHeight / src.childElementCount;
  }

}
