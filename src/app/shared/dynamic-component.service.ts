import {ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

@Injectable()
export class DynamicComponentService {

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  public async createComponent<T>(viewContainerRef: ViewContainerRef, componentType: Type<T>, withClear: boolean = true): Promise<ComponentRef<T>> {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType);
    if (withClear) {
      viewContainerRef.clear();
    }
    const componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.changeDetectorRef.detectChanges();
    // Fix ExpressionChangedAfterItHasBeenCheckedError
    await Observable.of(null).delay(0).toPromise();
    return componentRef;
  }

}
