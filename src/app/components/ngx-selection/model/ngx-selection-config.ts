import {NgxModalConfiguration} from '../../ngx-modal/bean/ngx-modal-configuration';

export class NgxSelectionConfig<T> extends NgxModalConfiguration {
  title?: string;
  minCount?: number;
  maxCount?: number;
  compare?: (first: T, second: T) => boolean;
}
