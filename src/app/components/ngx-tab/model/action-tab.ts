import {Tab} from '../../../data/local/tab';

export class ActionTab extends Tab {
  action: () => Promise<void>;
}
