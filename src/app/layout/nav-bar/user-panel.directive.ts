import {Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appUserPanel]'
})
export class UserPanelDirective {

  readonly className: string = 'minify';

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onDocumentClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement || this.elementRef.nativeElement.contains(targetElement)) {
      return;
    }
    const element = this.elementRef.nativeElement;
    if (!element.classList.contains(this.className)) {
      this.renderer.addClass(this.elementRef.nativeElement, this.className);
    }
  }

  @HostListener('click')
  onClick() {
    const element = this.elementRef.nativeElement;
    if (element.classList.contains(this.className)) {
      this.renderer.removeClass(element, this.className);
    } else {
      this.renderer.addClass(element, this.className);
    }
  }

}
