import {Params} from '@angular/router';

export class Tab {
  /**
   * @deprecated Use nameKey
   */
  public name: string;
  public nameKey: string;
  public routerLink: string;
  public queryParams: Params;
}
