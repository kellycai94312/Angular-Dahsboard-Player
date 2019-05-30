import {BaseNgxTab} from './base-ngx-tab';

export class NgxTabAction extends BaseNgxTab {
  public action: (tabAction: NgxTabAction) => Promise<void>;
}
