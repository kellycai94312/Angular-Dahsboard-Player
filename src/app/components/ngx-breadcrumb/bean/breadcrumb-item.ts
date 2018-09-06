import {Params} from '@angular/router';

export class BreadcrumbItem {
  public name?: string;
  public nameKey?: string;
  public url: string;
  public params: Params;
}
