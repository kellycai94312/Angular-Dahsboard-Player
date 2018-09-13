import {Directive, ViewContainerRef} from '@angular/core';

/*
@deprecated Use NgxSelectionComponent
 */
@Directive({
  selector: '[appAd]'
})
export class AdDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}
