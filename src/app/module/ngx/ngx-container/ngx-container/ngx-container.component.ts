import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {map, switchMap, takeUntil, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'ngx-container',
  templateUrl: './ngx-container.component.html',
  styleUrls: ['./ngx-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxContainerComponent implements OnInit, OnDestroy {

  @ViewChild('container')
  public containerElementRef: ElementRef<HTMLElement>;

  @ViewChild('splitter')
  public splitterElementRef: ElementRef<HTMLElement>;

  @Input()
  public vertical = true;

  @Input()
  public reverse: boolean;

  @Input()
  public top: boolean;

  @Input()
  public minSize: string;

  @Input()
  public size: string = this.minSize;

  @Output()
  public readonly sizeChange = new EventEmitter<string>();

  @Input()
  public maxSize: string;

  private _delta: { x: number, y: number };
  private _notDestroyed = true;
  private _startRect: ClientRect | DOMRect;

  public get fxLayout(): string {
    let result = this.vertical ? 'row' : 'column';
    if (this.reverse) {
      result += '-reverse';
    }
    return result;
  }

  public get getStyle(): { [key: string]: string } | null {
    const style: { [key: string]: string } = {};
    if (this.minSize) {
      let styleName = 'min-';
      if (this.vertical) {
        styleName += 'width';
      } else {
        styleName += 'height';
      }
      style[styleName] = this.minSize;
    }

    if (this.maxSize) {
      let styleName = 'max-';
      if (this.vertical) {
        styleName += 'width';
      } else {
        styleName += 'height';
      }
      style[styleName] = this.maxSize;
    }

    if (this.size || +this.size == 0) {
      let styleName = '';
      if (this.vertical) {
        styleName += 'width';
      } else {
        styleName += 'height';
      }
      style[styleName] = this.size;
    }

    return style;
  }

  constructor(private _renderer: Renderer2,
              private _ngZone: NgZone,
              private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._ngZone.runOutsideAngular(args => {
      const mousedown$ = fromEvent(this.splitterElementRef.nativeElement, 'mousedown');
      const mousemove$ = fromEvent(window.document, 'mousemove');
      const mouseup$ = fromEvent(window.document, 'mouseup');

      const mousedrag$ = mousedown$.pipe(
        takeWhile(() => this._notDestroyed),
        switchMap((event: MouseEvent) => {
          const startX = event.clientX;
          const startY = event.clientY;

          this._startRect = this.containerElementRef.nativeElement.getBoundingClientRect();
          return mousemove$.pipe(
            takeUntil(mouseup$),
            map((innerEvent: MouseEvent) => {
              innerEvent.preventDefault();
              const x = innerEvent.clientX - startX;
              const y = innerEvent.clientY - startY;
              this._delta = {
                x: this.reverse ? -x : x,
                y: this.reverse ? -y : y
              };
            })
          );
        })
      );

      mousedrag$.pipe(takeWhile(() => this._notDestroyed))
        .subscribe(() => {
          if (this.vertical) {
            this.size = `${this._startRect.width + this._delta.x}px`;
            this._renderer.setStyle(this.containerElementRef.nativeElement, 'width', this.size);
          } else {
            this.size = `${this._startRect.height + this._delta.y}px`;
            this._renderer.setStyle(this.containerElementRef.nativeElement, 'height', this.size);
          }
          this._changeDetectorRef.markForCheck();
          this.sizeChange.emit(this.size);
        });
    });
  }

  ngOnDestroy(): void {
    this._notDestroyed = false;
  }

}
