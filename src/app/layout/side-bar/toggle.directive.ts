import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';


/**
 * toggle parent element class
 * */
@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective implements OnInit {

  readonly className: string = 'minify';

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    const minify: boolean = localStorage.getItem(this.className) == 'true';
    if (minify) {
      const parent = this.elementRef.nativeElement.parentElement.parentElement;
      this.renderer.addClass(parent, this.className);
    }
  }

  @HostListener('click')
  onClick() {
    const parent = this.elementRef.nativeElement.parentElement.parentElement;
    if (parent.classList.contains(this.className)) {
      this.renderer.removeClass(parent, this.className);
      localStorage.setItem(this.className, String(false));
    } else {
      this.renderer.addClass(parent, this.className);
      localStorage.setItem(this.className, String(true));
    }
  }

}
