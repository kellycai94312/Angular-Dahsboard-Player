import {Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Direction} from '../model/direction';

@Directive({
  selector: '[ngxScroll]'
})
export class NgxScrollDirective implements OnInit, OnDestroy {

  @Input()
  public attachedYOffset: number;

  @Input()
  public autoScroll: boolean;

  @Input()
  public windowScroll: boolean;

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
  private _attached: boolean;
  private _previousHeight: number;

  private readonly mutationObserver: MutationObserver;

  @HostListener('scroll')
  public onScrollHostListener(): void {
    this.onScroll();
  }

  @HostListener('window:scroll')
  public onWindowScrollHostListener(): void {
    this.onScroll();
  }

  constructor(private _elementRef: ElementRef) {
    this.attachedYOffset = 1;

    this.scrollUpDistance = 25;
    this.scrollDownDistance = 75;

    this._rearScrollHeight = Number.MIN_VALUE;
    this._frontPosition = Number.MIN_VALUE;

    this.scrollUp = new EventEmitter<void>();
    this.scrollDown = new EventEmitter<void>();

    this.mutationObserver = new MutationObserver(() => {
      if (this._attached) {
        this.scrollToDown();
      }

      // Recalculate rear and front if the height has decreased
      const currentHeight = this.getHeight();
      if (this._previousHeight > currentHeight) {
        if (this._rearScrollHeight > currentHeight) {
          this._rearScrollHeight = currentHeight;
        }
        if (this._frontPosition > currentHeight) {
          this._frontPosition = currentHeight;
        }
      }
      this._previousHeight = currentHeight;
    });
    this.mutationObserver.observe(this._elementRef.nativeElement, {
      childList: true,
      subtree: true
    });
  }

  ngOnInit(): void {
    this._previousHeight = this.getHeight();
  }

  ngOnDestroy(): void {
    this.mutationObserver.disconnect();
  }

  public scrollToDown(): void {
    if (!this.getDistanceToBottom()) {
      return;
    }
    this.scrollTo(this.getHeight());
  }

  public scrollTo(position: number): void {
    if (this.windowScroll) {
      const scrollToOptions: ScrollToOptions = {left: 0, top: position};
      if (this.scrollWithSmooth) {
        scrollToOptions.behavior = 'smooth';
      }
      window.scrollTo(scrollToOptions);
    } else {
      this._elementRef.nativeElement.scrollTo(position);
    }
  }

  public getHeight(): number {
    if (this.windowScroll) {
      return document.documentElement.scrollHeight;
    }
    return this._elementRef.nativeElement.scrollHeight;
  }

  public getScrollYPosition(): number {
    if (this.windowScroll) {
      return document.documentElement.scrollTop;
    }
    return this._elementRef.nativeElement.scrollTop;
  }

  public getViewPortHeight(): number {
    if (this.windowScroll) {
      return document.documentElement.clientHeight;
    }
    return this._elementRef.nativeElement.clientHeight;
  }

  public getDistanceToBottom() {
    return Math.round(this.getHeight() - this.getViewPortHeight() - this.getScrollYPosition());
  }

  private onScroll(): void {
    this._attached = this.autoScroll && this.attachedYOffset >= this.getDistanceToBottom();
    const height = this.getHeight();

    switch (this.getScrollDirection()) {
      case Direction.UP: {
        const yPositionInPercent = 100.0 * this.getScrollYPosition() / height;
        if (yPositionInPercent < this.scrollUpDistance && this._rearScrollHeight != height) {
          // console.log('UP');
          this._rearScrollHeight = height;
          this.scrollUp.emit();
        }
      }
        break;
      case Direction.DOWN: {
        const distanceToTop = this.getScrollYPosition() + this.getViewPortHeight();
        const yPositionInPercent = 100.0 * distanceToTop / height;
        if (this._frontPosition < distanceToTop && this.scrollDownDistance < yPositionInPercent) {
          // console.log('DOWN');
          this._frontPosition = height;
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

}
