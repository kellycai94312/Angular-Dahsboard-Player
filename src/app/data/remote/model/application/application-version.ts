import {ShortNameObject} from '../../base/short-name-object';
import {Application} from './application';

export class ApplicationVersion extends ShortNameObject {
  public manufacturerResource: string;
  public application: Application;
}
