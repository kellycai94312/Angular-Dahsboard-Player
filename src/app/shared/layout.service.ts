import {ReplaySubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {FuseConfigService} from '../../@fuse/services/config.service';

@Injectable()
export class LayoutService {

  public readonly hidden: ReplaySubject<boolean>;
  public readonly dark: ReplaySubject<boolean>;

  private hiddenRoutes: string[] = ['sign-in', 'sign-up', 'registration', 'password', 'not-found'];

  constructor(private _fuseConfigService: FuseConfigService) {
    this.hidden = new ReplaySubject<boolean>(1);
    this.dark = new ReplaySubject<boolean>(1);
  }

  public toggleLayout(urlPath: string): boolean {
    const items = urlPath.split('/').filter(x => !!x);
    let res = true;
    for (const item of items) {
      res = this.hiddenRoutes.filter(x => item.indexOf(x) > -1).length > 0;
      if (res) {
        break;
      }
    }
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: res
        },
        toolbar: {
          hidden: res
        },
        footer: {
          hidden: res
        },
        sidepanel: {
          hidden: res
        }
      }
    };
    this.hidden.next(res);
    return res;
  }

}
