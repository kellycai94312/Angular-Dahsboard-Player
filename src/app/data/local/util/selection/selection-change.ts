import {SelectionModel} from './selection-model';

export interface SelectionChange<T> {
  source: SelectionModel<T>;
  added: T[];
  removed: T[];
}
