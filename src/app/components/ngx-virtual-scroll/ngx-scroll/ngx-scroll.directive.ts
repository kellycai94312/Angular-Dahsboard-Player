import {Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output} from '@angular/core';
import {Direction} from '../model/direction';
import {Observable} from 'rxjs';
import {ISubscription} from 'rxjs/Subscription';


@Directive({
  selector: '[ngxScroll]'
})
export class NgxScrollDirective implements OnDestroy {

  @Input()
  public attachedYOffset: number;

  @Input()
  public authScroll: boolean;

  @Output()
  public readonly scrollUp: EventEmitter<void>;

  @Output()
  public readonly scrollDown: EventEmitter<void>;

  private _rearScrollHeight: number;
  private _frontPosition: number;

  private _isAttached: boolean;
  private _lastScrollTop: number;

  private readonly _timerSubscription: ISubscription;

  @HostListener('scroll')
  public onScroll(): void {
    if (this.authScroll) {
      const scrollBottomPosition = this._elementRef.nativeElement.scrollHeight - this._elementRef.nativeElement.scrollTop - this._elementRef.nativeElement.clientHeight;
      this._isAttached = this.attachedYOffset > scrollBottomPosition;
    }

    switch (this.getScrollDirection()) {
      case Direction.UP:
        if (0 == this._elementRef.nativeElement.scrollTop && this._rearScrollHeight != this._elementRef.nativeElement.scrollHeight) {
          this._rearScrollHeight = this._elementRef.nativeElement.scrollHeight;
          this.scrollUp.emit();
        }
        break;
      case Direction.DOWN:
        if (this._frontPosition < this._elementRef.nativeElement.scrollTop) {
          this._frontPosition = this._elementRef.nativeElement.scrollTop + this._elementRef.nativeElement.clientHeight + 1;
          this.scrollDown.emit();
        }
        break;
    }

  }

  constructor(private _elementRef: ElementRef) {
    this.attachedYOffset = 3;
    this.authScroll = false;
    this._isAttached = false;

    this._rearScrollHeight = Number.MIN_VALUE;
    this._frontPosition = Number.MIN_VALUE;

    this.scrollUp = new EventEmitter<void>();
    this.scrollDown = new EventEmitter<void>();

    this._timerSubscription = Observable.timer(0, 500).subscribe(x => {
      if (this.authScroll && this._isAttached) {
        this.scrollToDown();
      }
    });
  }

  ngOnDestroy(): void {
    this._timerSubscription.unsubscribe();
  }

  public scrollToDown(): void {
    if (this._elementRef.nativeElement.scrollTop == this._elementRef.nativeElement.scrollHeight - this._elementRef.nativeElement.clientHeight) {
      return;
    }

    this.scrollTo(this._elementRef.nativeElement.scrollHeight - this._elementRef.nativeElement.clientHeight);
  }

  public scrollTo(position: number): void {
    this._elementRef.nativeElement.scrollTop = position;
  }

  private getScrollDirection(): Direction {
    let direction: Direction;
    const scrollTop = this._elementRef.nativeElement.scrollTop;
    if (scrollTop < this._lastScrollTop) {
      direction = Direction.UP;
    } else {
      direction = Direction.DOWN;
    }
    this._lastScrollTop = scrollTop;
    return direction;
  }

}
