import {ComponentFactoryResolver, Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {NgxBusyIndicatorComponent} from '../ngx-busy-indicator/ngx-busy-indicator.component';

@Directive({
  selector: '[ngxBusy]'
})
export class NgxBusyDirective<T extends boolean | any> {

  @Input()
  set ngxBusy(value: T) {
    this.updateView(value);
  }

  private _isBusy: boolean;
  private _ngxBusy: T;

  constructor(private _templateRef: TemplateRef<any>,
              private _viewContainerRef: ViewContainerRef,
              private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  private updateView(data: T) {
    this._ngxBusy = data;

    if (typeof data === 'boolean') {
      this.changeViewBusy(data);
    } else if (!data) {
      this.changeViewBusy(false);
    }
  }

  private changeViewBusy(busy: boolean): void {
    this._isBusy = busy;
    this._viewContainerRef.clear();
    if (busy) {
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(NgxBusyIndicatorComponent);
      this._viewContainerRef.createComponent(componentFactory);
    } else {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
  }

}
