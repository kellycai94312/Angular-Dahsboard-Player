import {ReplaySubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {FuseConfigService} from '../../@fuse/services/config.service';

@Injectable()
export class LayoutService {

  public readonly hidden: ReplaySubject<boolean>;
  public readonly dark: ReplaySubject<boolean>;

  private hiddenRoutes: string[] = ['/sign-in', '/sign-up', '/registration', '/password', '/not-found'];

  constructor(private _fuseConfigService: FuseConfigService) {
    this.hidden = new ReplaySubject<boolean>(1);
    this.dark = new ReplaySubject<boolean>(1);
  }

  public toggleLayout(urlPath: string): boolean {
    const res = this.hiddenRoutes.indexOf(urlPath) > -1;
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
