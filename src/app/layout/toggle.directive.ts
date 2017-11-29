import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';


/**
 * toggle parent element class
 * */
@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective {

  readonly className: string = 'minify';

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef) {
  }

  @HostListener('click')
  onClick() {
    const parent = this.elementRef.nativeElement.parentElement;
    if (parent.classList.contains(this.className)) {
      this.renderer.removeClass(parent, this.className);
    } else {
      this.renderer.addClass(parent, this.className);
    }
  }

}
