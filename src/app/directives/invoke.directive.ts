import { AfterContentInit, Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[invoke]'
})
export class InvokeDirective implements AfterContentInit {

  @Output()
  invoke: EventEmitter<any>;

  constructor() {
    this.invoke = new EventEmitter<any>();
  }

  ngAfterContentInit() {
    this.invoke.emit(null);
  }

}
