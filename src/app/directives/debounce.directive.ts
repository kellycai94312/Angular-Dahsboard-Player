import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[debounce]'
})
export class DebounceDirective implements OnInit {

  @Input() delay = 700;
  @Output() func = new EventEmitter();

  constructor(private elementRef: ElementRef, private model: NgModel) {
  }


  ngOnInit(): void {
    const eventStream = Observable.fromEvent(this.elementRef.nativeElement, 'keydown')
      .map(() => this.model.value)
      .debounceTime(this.delay);

    eventStream.subscribe(input => this.func.emit(input));
  }
}
