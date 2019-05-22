import {NgxTabAction} from './ngx-tab-action';
import {BaseNgxTab} from './base-ngx-tab';
import {NgxTabMenuItem} from './ngx-tab-menu-item';

export class NgxTab extends BaseNgxTab {
  public link: string;
  public menuItems?: NgxTabMenuItem[];
  public actions?: NgxTabAction[];
}
