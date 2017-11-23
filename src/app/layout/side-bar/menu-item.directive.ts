import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appMenuItem]'
})
export class MenuItemDirective {

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef) {
  }

  @HostListener('click')
  onClick() {
    if (this.elementRef.nativeElement.classList.contains('active')) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'active');
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'active');
    }
  }

}
