import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {IHasChange} from '../data/local/has-change';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<any> {

  async canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Promise<boolean> {
    const hasChangeComponent = (component as IHasChange);
    if (hasChangeComponent && hasChangeComponent.hasChange) {
      return await hasChangeComponent.hasChange();
    }
    return true;
  }

}
