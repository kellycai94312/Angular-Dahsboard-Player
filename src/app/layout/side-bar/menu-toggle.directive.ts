import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMenuToggle]'
})
export class MenuToggleDirective {

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef) {
  }


  @HostListener('click')
  onClick() {
    /*sidebar-toggle > wrapper */
    const parent = this.elementRef.nativeElement.parentElement;
    if (parent.classList.contains('mini')) {
      this.renderer.removeClass(parent, 'mini');
    } else {
      this.renderer.addClass(parent, 'mini');
    }
  }

}
