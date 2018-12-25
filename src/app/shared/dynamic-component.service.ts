import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {ComponentFactoryResolver, ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';

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
    await of(null).pipe(delay(0)).toPromise();
    return componentRef;
  }

}
