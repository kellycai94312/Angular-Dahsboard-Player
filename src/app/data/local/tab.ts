import {Params} from '@angular/router';
import {SplitButtonItem} from '../../components/ngx-split-button/bean/split-button-item';

export class Tab {
  public name?: string;
  public nameKey?: string;
  public routerLink: string;
  public queryParams?: Params;
  public visible?: () => boolean;
  public splitButtonsItems?: SplitButtonItem[];
  public canNavigate?: () => boolean;
}
