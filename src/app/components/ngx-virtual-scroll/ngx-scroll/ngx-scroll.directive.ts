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

  @Input()
  public scrollUpDistance: number;

  @Input()
  public scrollDownDistance: number;

  @Input()
  public scrollWithSmooth: boolean;

  @Output()
  public readonly scrollUp: EventEmitter<void>;

  @Output()
  public readonly scrollDown: EventEmitter<void>;

  private _rearScrollHeight: number;
  private _frontPosition: number;

  private _lastScrollTop: number;
  private _isInitScrolled: boolean;

  private readonly _timerSubscription: ISubscription;

  // TODO: Use window:scroll for window
  @HostListener('scroll')
  public onScroll(): void {
    switch (this.getScrollDirection()) {
      case Direction.UP: {
        const yPositionInPercent = 100.0 * this.getScrollYPosition() / (this.getHeight());
        if (yPositionInPercent < this.scrollUpDistance && this._rearScrollHeight != this.getHeight()) {
          // console.log('UP');
          this._rearScrollHeight = this.getHeight();
          this.scrollUp.emit();
        }
      }
        break;
      case Direction.DOWN: {
        const yPositionInPercent = 100.0 * (this.getScrollYPosition() + this.getViewPortHeight()) / (this.getHeight());
        if (this._frontPosition < this.getScrollYPosition() && this.scrollDownDistance < yPositionInPercent) {
          // console.log('DOWN');
          this._frontPosition = this.getHeight();
          this.scrollDown.emit();
        }
      }

        break;
    }

    // console.log('getHeight: ' + this.getHeight());
    // console.log('getScrollYPosition: ' + this.getScrollYPosition());
    // console.log('getViewPortHeight: ' + this.getViewPortHeight());
    // console.log('getDistanceToBottom: ' + this.getDistanceToBottom());
  }

  constructor(private _elementRef: ElementRef) {
    this.attachedYOffset = 80;
    this.authScroll = true;

    this.scrollUpDistance = 20;
    this.scrollDownDistance = 80;

    this._rearScrollHeight = Number.MIN_VALUE;
    this._frontPosition = Number.MIN_VALUE;

    this.scrollUp = new EventEmitter<void>();
    this.scrollDown = new EventEmitter<void>();

    this._timerSubscription = Observable.timer(0, 500).subscribe(x => {
      if (this.authScroll && this.attachedYOffset > this.getDistanceToBottom()) {
        this.scrollToDown();
      } else {
        if (!this._isInitScrolled) {
          this._isInitScrolled = true;
          this.scrollToDown();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._timerSubscription.unsubscribe();
  }

  public scrollToDown(): void {
    if (!this.getDistanceToBottom()) {
      return;
    }

    this.scrollTo(this.getHeight());
  }

  public scrollTo(position: number): void {
    setTimeout(() => {
      /* TODO: For window
      const scrollToOptions: ScrollToOptions = {left: 0, top: position};
      if (this.scrollWithSmooth) {
        scrollToOptions.behavior = 'smooth';
      }
      window.scrollTo(scrollToOptions);*/

      this._elementRef.nativeElement.scrollTop = position;
    });
  }

  private getScrollDirection(): Direction {
    let direction: Direction;
    const scrollTop = this.getScrollYPosition();
    if (scrollTop < this._lastScrollTop) {
      direction = Direction.UP;
    } else {
      direction = Direction.DOWN;
    }
    this._lastScrollTop = scrollTop;
    return direction;
  }

  private getHeight(): number {
    return this._elementRef.nativeElement.scrollHeight;
  }

  private getScrollYPosition(): number {
    return Math.round(this._elementRef.nativeElement.scrollTop);
    // TODO: return window.pageYOffset || document.documentElement.scrollTop;
  }

  private getViewPortHeight(): number {
    return this._elementRef.nativeElement.clientHeight;
    // TODO: return window.innerHeight;
  }

  private getDistanceToBottom() {
    return Math.round(this.getHeight() - this.getViewPortHeight() - this.getScrollYPosition());
  }

}
