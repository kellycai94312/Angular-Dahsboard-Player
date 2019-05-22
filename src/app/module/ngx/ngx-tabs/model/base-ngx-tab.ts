import {Observable} from 'rxjs';

export abstract class BaseNgxTab {
  public iconName?: string;
  public translation?: string;
  public label?: string;
  public data?: any;
  public hidden$?: Observable<boolean>;
}
