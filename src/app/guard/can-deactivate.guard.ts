import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {ICanDeactivate} from '../data/local/component/ican-deactivate';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<any> {

  async canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Promise<boolean> {
    const hasChangeComponent = (component as ICanDeactivate);
    if (hasChangeComponent && hasChangeComponent.canDeactivate) {
      return await hasChangeComponent.canDeactivate();
    }
    return true;
  }

}
