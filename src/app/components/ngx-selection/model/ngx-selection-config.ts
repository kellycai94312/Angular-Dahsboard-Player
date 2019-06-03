import {NgxModalConfiguration} from '../../ngx-modal/bean/ngx-modal-configuration';
import {Observable} from 'rxjs';
import {NgxSelectionComponent} from '../ngx-selection/ngx-selection.component';
import {NgxSelect} from '../../../module/ngx/ngx-select/model/ngx-select';
import {SplitButtonItem} from '../../ngx-split-button/bean/split-button-item';
import {NgxModalRef} from '../../ngx-modal/bean/ngx-modal-ref';

export class NgxSelectionConfig<T> extends NgxModalConfiguration {
  title?: string;
  canEdit?: boolean;
  minCount?: number;
  maxCount?: number;
  compare?: (first: T, second: T) => boolean;
  selected?: (value: T, component: NgxSelectionComponent<any, any, T>) => Observable<boolean>;
  deselected?: (value: T, component: NgxSelectionComponent<any, any, T>) => Observable<boolean>;
  itemsNgxSelect?: NgxSelect;
  actions?: (modal: NgxModalRef) => SplitButtonItem[];
}
